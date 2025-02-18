const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      logger.warn(`Registration failed: Username ${username} already exists`);
      return res.status(400).json({ 
        error: 'Username already exists',
        field: 'username'
      });
    }

    const user = await User.create({
      username,
      password,
      role: role || 'agent'
    });

    logger.info(`User registered successfully: ${username}`);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    logger.error('Registration failed:', err);
    
    // Handle validation errors
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: err.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }

    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    
    if (!user || !(await user.validatePassword(password))) {
      logger.warn(`Login failed: Invalid credentials for user ${username}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.info(`User logged in successfully: ${username}`);
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toJSON();
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (err) {
    logger.error('Login failed:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findByPk(req.user.id);
    
    if (username) {
      // Check if username is already taken
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      user.username = username;
    }

    await user.save();
    logger.info(`Profile updated for user: ${user.id}`);
    const { password, ...updatedUser } = user.toJSON();
    res.json(updatedUser);
  } catch (err) {
    logger.error('Profile update failed:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    logger.info(`Password changed for user: ${user.id}`);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    logger.error('Password change failed:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
};

module.exports = { 
  register, 
  login, 
  updateProfile, 
  changePassword 
};
