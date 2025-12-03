const express = require('express');
const {UserModel,productModel} = require('../models');

// get all products
async function getAllProducts(req, res) {
  try {
    const products = await productModel.find({});
    res.status(200).json({success:true, products});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}
module.exports = { getAllProducts };