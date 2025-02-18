const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const logger = require('./utils/logger');
const { initDatabase } = require('./config/database');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(apiLimiter);
app.use('/users/login', authLimiter);

// Add logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import routes
const gadgetRoutes = require('./routes/gadgetRoutes');
const userRoutes = require('./routes/userRoutes');

// Routes
app.use('/users', userRoutes);
app.use('/gadgets', gadgetRoutes);

// Error handling
app.use(errorHandler);

// 404 handler for API routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const startServer = async () => {
  try {
    await initDatabase();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
