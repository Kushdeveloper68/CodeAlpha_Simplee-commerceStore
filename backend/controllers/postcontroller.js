// ...existing code...
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { UserModel, productModel,OtpModel } = require('../models');
// new

const JWT_SECRET = process.env.JWTKEY || 'kush123';
const OTP_TTL_MINUTES = 10;

// configure nodemailer transporter (expects env EMAIL_USER and EMAIL_PASS)
const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL, // your gmail
        pass: process.env.PASS // your app password
      }
});

// helper to generate numeric OTP
function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
}

// SEND OTP
async function sendOtp(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    // upsert OTP for this email
    await OtpModel.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { otpHash, expiresAt, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // send email
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Your ShopSmart OTP',
      text: `Your verification code is ${otp}. It will expire in ${OTP_TTL_MINUTES} minutes.`,
      html: `<p>Your verification code is <b>${otp}</b>. It will expire in ${OTP_TTL_MINUTES} minutes.</p>`
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('sendOtp error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
  }
}

// VERIFY OTP and SIGNUP
async function verifyOtpAndSignup(req, res) {
  try {
    const { fullName, email, password, otp } = req.body;
    if (!fullName || !email || !password || !otp) {
      return res.status(400).json({ success: false, message: 'All fields and otp are required' });
    }

    const emailNorm = email.toLowerCase().trim();

    // find OTP record
    const otpDoc = await OtpModel.findOne({ email: emailNorm });
    if (!otpDoc) {
      return res.status(400).json({ success: false, message: 'OTP not found or expired' });
    }

    if (otpDoc.expiresAt < new Date()) {
      await OtpModel.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    const isMatch = await bcrypt.compare(String(otp), otpDoc.otpHash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // check existing user
    const existing = await UserModel.findOne({ email: emailNorm });
    if (existing) {
      await OtpModel.deleteOne({ _id: otpDoc._id }); // cleanup
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      fullName,
      email: emailNorm,
      password: hashed
    });

    // remove otp doc
    await OtpModel.deleteOne({ _id: otpDoc._id });

    // generate JWT
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });

    return res.status(201).json({
      success: true,
      message: 'Signup successful',
      token,
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email }
    });
  } catch (error) {
    console.error('verifyOtpAndSignup error:', error);
    return res.status(500).json({ success: false, message: 'Error during signup', error: error.message });
  }
}

// keep existing signup/login/productadd if you want them as well
// existing signUp function (optional) - keep or remove depending on flow

// LOGIN (update to use bcrypt)
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ success: true, message: 'Login successful', token, user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}

// ...existing code...

// ADD TO CART
async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id; // from middleware

    // Validate required fields
    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated. Please login first.' });
    }

    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
    }

    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if product has enough quantity
    if (product.quantity < quantity) {
      return res.status(400).json({ success: false, message: `Only ${product.quantity} items available in stock` });
    }

    // Find user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if product already exists in cart
    const existingCartItem = user.cart.find(item => item.productId.toString() === productId);

    if (existingCartItem) {
      // Update quantity if product already in cart
      existingCartItem.quantity += quantity;
    } else {
      // Add new item to cart
      user.cart.push({ productId, quantity });
    }

    // Save user with updated cart
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      cart: user.cart
    });
  } catch (error) {
    console.error('addToCart error:', error);
    return res.status(500).json({ success: false, message: 'Error adding to cart', error: error.message });
  }
}


// ...existing code...

// REMOVE FROM CART
async function removeFromCart(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Remove product from cart
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      cart: user.cart
    });
  } catch (error) {
    console.error('removeFromCart error:', error);
    return res.status(500).json({ success: false, message: 'Error removing from cart', error: error.message });
  }
}

// UPDATE CART ITEM QUANTITY
async function updateCartQuantity(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!productId || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if product exists in cart
    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    // Check product availability
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ success: false, message: `Only ${product.quantity} items available in stock` });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Cart item quantity updated successfully',
      cart: user.cart
    });
  } catch (error) {
    console.error('updateCartQuantity error:', error);
    return res.status(500).json({ success: false, message: 'Error updating cart', error: error.message });
  }
}

// Add these new functions

// UPDATE USER ADDRESS
async function updateUserAddress(req, res) {
  try {
    const { streetAddress, apartment, city, stateOrProvince, postalCode, country } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!streetAddress || !city || !postalCode || !country) {
      return res.status(400).json({ success: false, message: 'Please provide all required address fields' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update address
    user.address = {
      streetAddress,
      apartment: apartment || '',
      city,
      stateOrProvince: stateOrProvince || '',
      postalCode,
      country
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      address: user.address
    });
  } catch (error) {
    console.error('updateUserAddress error:', error);
    return res.status(500).json({ success: false, message: 'Error updating address', error: error.message });
  }
}

// CREATE ORDER FROM CART
async function createOrder(req, res) {
  try {
    const { streetAddress, apartment, city, stateOrProvince, postalCode, country } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!streetAddress || !city || !postalCode || !country) {
      return res.status(400).json({ success: false, message: 'Please provide all required address fields' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Create order from cart items
    const orderItems = user.cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    const shippingDetails = {
      streetAddress,
      apartment: apartment || '',
      city,
      stateOrProvince: stateOrProvince || '',
      postalCode,
      country
    };

    // Create new order
    const newOrder = {
      items: orderItems,
      shippingDetails,
      status: 'pending',
      createdAt: new Date()
    };

    // Add order to user
    user.orders.push(newOrder);

    // Clear cart
    user.cart = [];

    // Update user address
    user.address = shippingDetails;

    await user.save();

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
      orderId: newOrder._id
    });
  } catch (error) {
    console.error('createOrder error:', error);
    return res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
  }
}




async function productadd(req, res) {
  const data = [
    {
      "productTitle": "Wireless Gaming Mouse",
      "shortDescription": "High-precision RGB gaming mouse.",
      "longDescription": "Ergonomic wireless mouse with customizable RGB lighting. High DPI sensor ensures precise control for gamers.",
    "rating": 4.7,
    "price": 1999,
    "quantity": 50,
    "mainImageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBhBCilDiazReku0dpUWyBBVQErVpqUDEjaYLmDXjmG1GtjuFtSYQRkgAgUXL1YbLyXzpjI_3wYex4QIq2CaNDwHcMmzZMkylCgE2ph6w1Otw_2OYvevRSTUwgyKJGxj_7kQ3ugGZhCTrObK-empM2nmxyPOw4f-LQqlf2LuXwm67eNjVpPEhOI5gOCldDl1l3_Eze7VmbSf-zBfL5IAK0eCElsEpJkonJNIPjEKM_IFUxJYXl4h7fS4kiAjr7vZJnw6CB0qg7XxgHs",
    "moreImages": []
  },
  {
    "productTitle": "Smartphone Holder",
    "shortDescription": "Adjustable mobile stand for desk.",
    "longDescription": "Keep your phone at the perfect angle while working or watching videos. Foldable and lightweight design.",
    "rating": 4.4,
    "price": 499,
    "quantity": 120,
    "mainImageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAcTGDQz859s2T6qDp6w8_pgI8uTShz8eSryC-kXo36HJVNfa7PENb4HwNPesYcZNsPvKxjausdcvtqEY-rxAZRHEscbPU7JBrWkqGhehxFi-xuEsU4GRjD9Owh1_lbhqKdz_q7FKy9eYfmIV40sYJzEL0Xc1iMyWALBhZqvEwUTuv5mqaqbELX9N-0HbyEbaltAwmeX1zonsTYQsJEDCWj3GiifQ4Pc7PbOEtwIUyK1fVmIEi2fW4oFQEenvnYXBKAv5tfeW_8otxU",
    "moreImages": []
  },
  {
    "productTitle": "Portable Power Bank",
    "shortDescription": "10000mAh fast-charging power bank.",
    "longDescription": "Compact and powerful power bank to charge your devices on the go. Dual USB ports and LED indicator included.",
    "rating": 4.5,
    "price": 999,
    "quantity": 75,
    "mainImageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC0lwFIlFFBvHSxz3n9OvtXdpG38Q5uMrpWNV-q4uWTtO07sSFhy8-xg7amG_8tzMBeLVeKnOrKb3aZYkU7JhgisqqFLUGuBKtzR8AUHBXen2AdBR1L9ZxxCWkUnJ100QWh17pVdHo9iWl9rewbO1fBb9reQjQiwiNpj-lECaTCJaFmmfaBneKg1037YbYER_Qr90P5zZMo9RloaqwFvX6RysNuzeRQHMlVT2vxGwIlmcfNSngFvi4cT0bG-SAX2rXiK6dxv5jiSSxR",
    "moreImages": []
  },
  {
    "productTitle": "Mini Bluetooth Speaker",
    "shortDescription": "Compact speaker with clear sound.",
    "longDescription": "Portable Bluetooth speaker delivering crisp sound and deep bass. Perfect for travel and small gatherings.",
    "rating": 4.6,
    "price": 799,
    "quantity": 90,
    "mainImageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDwG0C8UB-fFMppVRzVuoXJryMPmy-1fJjlAgL5SolMTNCL0NQa7GBaOXvbb8dG7fZwKsl4uaUx1IobzyOF3xzvfMp7dLFu3D2vk3nnrHbvDdjLBTimz8AaBy0yUntvVnPBE9tS8kbdzlmg-3TSKgD-WapUV8UBrK_Zf94MQXBrby-2TdQ_E4gKBetRrIzU8-REPnlJCODvGMu9QDdOGDIiBNrNORjm0tdNFIFXm0EAdMgPBrXy3iB1pollFKceaTWkC4jNSPrkPdTC",
    "moreImages": []
  },
  {
    "productTitle": "Digital Alarm Clock",
    "shortDescription": "LED display with multiple alarm settings.",
    "longDescription": "Modern digital alarm clock with adjustable brightness and snooze function. Perfect for bedside table.",
    "rating": 4.3,
    "price": 699,
    "quantity": 65,
    "mainImageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuANjy5MtclUC2ikTJ3lueepmKJiuBZmre2cBShrIz8kqpWDwJ14fPlt5yMEL18kAyZBhZzs_qqj5m2Enszjkli3QfWcTXy0wFNs6w3gwSvETosMSFDWd07JsGxxssLkj1AF1-qsqXYBVBJMsjaP72APKlLug2Q1dD1G8wMk6k4UZ-6nywQP8DgEv8scRzUrD7aWnHTv-SV2kLCXRQohXPejl3T58uykODfswXUl0xyROxWi97DLmoWqezBsYy8ftzQdX_Wj1cUAhVDi",
    "moreImages": []
  },
  {
    "productTitle": "Canvas Wall Art",
    "shortDescription": "Beautiful art prints for home decor.",
    "longDescription": "Premium canvas wall art with vibrant colors. Ideal for living rooms, bedrooms, or office spaces.",
    "rating": 4.5,
    "price": 1599,
    "quantity": 40,
    "mainImageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDlXPmrP9gTKzKqsLWD5ue9Oikv_Xc6TsFHaxIs1QDJ6EG51-if23AszJuF8V7MGEoqQjWS4FEGs96O9OAWvJUVTOC8te3IbDqfSHb8YU3uH6HtrHO9M4Iuxo1XgZz5LC00cgWpX4uW8S3b8B87Ez7tbVWrZ0zzeRiSU2avPe4Ejk16dwLJvht2sdFU-_I21J__OVHKBgyENDoXwcy6Wov62UvzxcZC8Jg2je7rLchAtIdvJhprVOxN0w3F9-AI5q_DLVzv8sy6IOzT",
    "moreImages": []
  },
  {
    "productTitle": "Portable Water Bottle",
    "shortDescription": "Eco-friendly stainless steel bottle.",
    "longDescription": "Durable and lightweight stainless steel water bottle. Keeps beverages hot or cold for hours.",
    "rating": 4.4,
    "price": 599,
    "quantity": 100,
    "mainImageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC6dOvurR7E8fKqUrFeOWQAft-esbBTM7V-D5PayegFujXA-rAUgope9fEcBmgX7uRhRRerDtaGU-WUT53c2hHPwXKsPAgrSa1Pgf-Y4_tEMKJON_fvojoUg2FWtdIU9NbskSLUnc0PFkIf49ifosIvrKn5zrgoCVCeU3zJgMASddYUkVHUAPjsgeRzMlLjCjk5Y0GrocTD41t7JAuWaRaI2a63EIvYfJYRjbJpJ5V-looQDxUIy2IcoojYQ-GCz8vCzFfYAGGdwQbY",
    "moreImages": []
  },
  {
    "productTitle": "Noise Cancelling Earbuds",
    "shortDescription": "Compact earbuds with deep bass.",
    "longDescription": "Enjoy immersive sound with noise cancellation technology. Comfortable fit and long battery life.",
    "rating": 4.6,
    "price": 2499,
    "quantity": 70,
    "mainImageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAPR1AKIcDg8t3Tbe6MfJnnN-IDR5Zu9FmN9YAfrULgjFmMO7uigMoWP5vHBN0chNZ-t3X_f9vqnZ2WOLzo9lO69bPWZXebF7q3tKsD5wH7kw56PFbtLlybCzF1FQUjNHWtOGEPRLGnoSxZa_xVw_71Pvvy7eF8Pmte4frhflfan2BwS0rsW_sTLAJ9DN-5te99I5zNc3WpuzyWngjlzlR9KLvYICtVzDj7SvDbGuMgKRLjudt2ghW7RQI3osrLmqqayAWdAOkC0uDn",
    "moreImages": []
  }
]

    await productModel.insertMany(data);
    res.status(201).json({ message: 'Products added successfully' });
}
// Export all functions
module.exports = {
  sendOtp,
  verifyOtpAndSignup,
  login,
  productadd,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  updateUserAddress,
  createOrder
};

      