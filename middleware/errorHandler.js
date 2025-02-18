const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      error: 'Access denied'
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler;
