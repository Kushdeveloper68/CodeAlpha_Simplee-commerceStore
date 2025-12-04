const express = require('express');
const { UserModel, productModel } = require('../models');

// get all products
async function getAllProducts(req, res) {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}

// GET USER CART WITH POPULATED PRODUCT DETAILS
async function getUserCart(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const user = await UserModel.findById(userId).populate({
      path: 'cart.productId',
      model: 'Product',
      select: 'productTitle mainImageUrl price quantity description'
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cartItems = user.cart.map(item => ({
      cartItemId: item._id,
      productId: item.productId._id,
      productTitle: item.productId.productTitle,
      mainImageUrl: item.productId.mainImageUrl,
      price: item.productId.price,
      availableQuantity: item.productId.quantity,
      cartQuantity: item.quantity,
      totalPrice: item.productId.price * item.quantity
    }));

    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = cartItems.length > 0 ? 5.00 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    return res.status(200).json({
      success: true,
      cartItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    });
  } catch (error) {
    console.error('getUserCart error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching cart', error: error.message });
  }
}

// GET USER ADDRESS
async function getUserAddress(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const user = await UserModel.findById(userId).select('fullName email address');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        address: user.address || {}
      }
    });
  } catch (error) {
    console.error('getUserAddress error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching user address', error: error.message });
  }
}

// GET USER ORDERS
async function getUserOrders(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const user = await UserModel.findById(userId).populate({
      path: 'orders.items.productId',
      model: 'Product',
      select: 'productTitle mainImageUrl price'
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const orders = user.orders.map(order => ({
      orderId: order._id,
      items: order.items.map(item => ({
        productId: item.productId._id,
        productTitle: item.productId.productTitle,
        mainImageUrl: item.productId.mainImageUrl,
        price: item.productId.price,
        quantity: item.quantity,
        totalPrice: item.productId.price * item.quantity
      })),
      shippingDetails: order.shippingDetails,
      status: order.status,
      createdAt: order.createdAt
    }));

    return res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('getUserOrders error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching orders', error: error.message });
  }
}

module.exports = { getAllProducts, getUserCart, getUserAddress, getUserOrders };