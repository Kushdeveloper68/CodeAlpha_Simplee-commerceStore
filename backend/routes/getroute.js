const express = require('express');
const getRouter = express.Router();
const {getAllProducts} = require('../controllers/getcontroller');


getRouter.get('/products', getAllProducts)
// Define GET routes here
module.exports = getRouter;