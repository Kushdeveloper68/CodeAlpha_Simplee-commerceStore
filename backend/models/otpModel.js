// ...existing code...
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true, index: true },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});


const OtpModel = mongoose.model('Otp', otpSchema);
module.exports = OtpModel;

// ...existing code...