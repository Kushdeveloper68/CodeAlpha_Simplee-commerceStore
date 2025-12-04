// ...existing code...
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWTKEY || 'kush123'; // fallback to match controller default for local dev

function jwtMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // also accept token in cookie 'token' if needed
  const tokenFromCookie = req.cookies && req.cookies.token;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (tokenFromCookie) {
    token = tokenFromCookie;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token missing. Please login or signup.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // { id, email, ... }
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token. Please login again.' });
  }
}

module.exports = jwtMiddleware;
// ...existing code...