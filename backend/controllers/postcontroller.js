const express = require('express');
const {UserModel,productModel} = require('../models');

// SIGN UP
async function signUp(req, res) {
  try {
    const { fullName, email, password } = req.body;
    console.log(req.body)
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const registeredUser = await UserModel.findOne({ email });
    if (registeredUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const newUser = await UserModel.create({ fullName, email, password });
    if(!newUser) res.status(400).json({ message: 'User registration failed' });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}

// LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
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
module.exports = {
    signUp,
    login,
    productadd
}