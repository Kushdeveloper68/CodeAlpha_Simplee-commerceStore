
// ...existing code...
const express = require('express');
const postRouter = express.Router();
const { signUp, login, productadd, sendOtp, verifyOtpAndSignup } = require('../controllers/postcontroller');

// SIGN UP ROUTE (deprecated raw signup - optional)

// NEW OTP endpoints
postRouter.post('/send-otp', sendOtp);
postRouter.post('/verify-signup', verifyOtpAndSignup);

// LOGIN ROUTE
postRouter.post('/login', login);
postRouter.post('/productadd', productadd);

module.exports = postRouter;
// ...existing code...