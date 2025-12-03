// middle ware to verify JWT token from client requests
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTKEY; // Use a strong secret key in production

async function jwtMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
    const token = authHeader.split(' ')[1];

    try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach decoded user info to request
    next(); // Proceed to next middleware or route handler
    } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
module.exports = jwtMiddleware;