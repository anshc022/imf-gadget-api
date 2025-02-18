const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../utils/logger');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    
    if (!user) throw new Error();
    
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    logger.error('Authentication failed:', err);
    res.status(401).json({ error: 'Please authenticate' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.warn(`Access denied for user ${req.user.id} with role ${req.user.role}`);
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
