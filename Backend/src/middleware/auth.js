
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = "scretKey" // scretKey

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; 
    next();
  });
};

module.exports = authenticateToken;