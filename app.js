const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Add CORS support
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/gadgets', require('./routes/gadgetRoutes'));
app.use('/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;