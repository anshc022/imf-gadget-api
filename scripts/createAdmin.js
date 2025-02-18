require('dotenv').config();
const { sequelize } = require('../config/database');
const User = require('../models/user');

async function createAdminUser() {
  try {
    await sequelize.authenticate();
    const admin = await User.create({
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user created:', admin.username);
    console.log('Please change the password after first login');
  } catch (err) {
    console.error('Failed to create admin:', err);
  } finally {
    await sequelize.close();
  }
}

createAdminUser();
