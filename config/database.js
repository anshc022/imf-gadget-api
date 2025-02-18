const { Sequelize } = require('sequelize');
require('dotenv').config();
const logger = require('../utils/logger');

const isDevelopment = process.env.NODE_ENV === 'development';
const dbUrl = isDevelopment ? process.env.DATABASE_URL : process.env.DATABASE_INTERNAL_URL;

logger.info(`Using database URL for ${isDevelopment ? 'development' : 'production'} environment`);

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: (msg) => logger.info(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectWithRetry = async () => {
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      logger.info('Database connection established successfully.');
      return;
    } catch (err) {
      retries -= 1;
      logger.error(`Database connection attempt failed. Retries left: ${retries}`);
      
      if (!retries && isDevelopment) {
        logger.info('Switching to public URL as fallback...');
        sequelize.config.host = process.env.DATABASE_URL;
        retries = 1;
        continue;
      }
      
      if (!retries) {
        logger.error('Unable to connect to the database:', err);
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    logger.info('Database synchronized successfully');
  } catch (err) {
    logger.error('Failed to sync database:', err);
    throw err;
  }
};

const initDatabase = async () => {
  await connectWithRetry();
  await syncDatabase();
  return sequelize;
};

module.exports = { sequelize, initDatabase };
