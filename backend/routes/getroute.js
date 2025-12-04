const express = require('express');
const getRouter = express.Router();
const { getAllProducts, getUserCart, getUserAddress, getUserOrders } = require('../controllers/getcontroller');
const jwtMiddleware = require('../middlewares/jwtMilddleware');

getRouter.get('/products', getAllProducts)

getRouter.get('/cart', jwtMiddleware, getUserCart);
getRouter.get('/user-address', jwtMiddleware, getUserAddress);
getRouter.get('/user-orders', jwtMiddleware, getUserOrders);
// Define GET routes here
module.exports = getRouter;