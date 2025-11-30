const mongoose = require('mongoose')

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: { type: Number, required: true, default: 1 }
})

// Order Item Schema
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: { type: Number, required: true, default: 1 }
})

// Shipping Details Schema (for each order)
const shippingSchema = new mongoose.Schema({
  streetAddress: String,
  apartment: String,
  city: String,
  stateOrProvince: String,
  postalCode: String,
  country: String
})

// Orders Schema
const orderSchema = new mongoose.Schema({
  items: [orderItemSchema], // items inside order
  shippingDetails: shippingSchema, // shipping address
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
})

// Main User Schema
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: { type: String, required: true },

    address: {
      streetAddress: String,
      apartment: String,
      city: String,
      stateOrProvince: String,
      postalCode: String,
      country: { type: String, default: 'India' }
    },

    cart: [cartItemSchema],

    orders: [orderSchema]
  },
  { timestamps: true }
)
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel
