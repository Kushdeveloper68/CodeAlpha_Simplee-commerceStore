
// ...existing code...
const express = require('express');
const postRouter = express.Router();
const { login, productadd, sendOtp, verifyOtpAndSignup, addToCart } = require('../controllers/postcontroller');
const jwtMiddleware = require("../middlewares/jwtMilddleware")
// SIGN UP ROUTE (deprecated raw signup - optional)

// NEW OTP endpoints
postRouter.post('/send-otp', sendOtp);
postRouter.post('/verify-signup', verifyOtpAndSignup);

// LOGIN ROUTE
postRouter.post('/login', login);
postRouter.post('/productadd', productadd);

postRouter.post('/add-to-cart', jwtMiddleware, addToCart);
module.exports = postRouter;
// ...existing code...