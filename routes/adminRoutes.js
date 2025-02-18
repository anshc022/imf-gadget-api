const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const User = require('../models/user');

/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Create a new admin user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin username
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Admin password
 *     responses:
 *       201:
 *         description: Admin user created successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Not authorized
 */
router.post('/create', 
  authenticate,
  authorize('admin'),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await User.create({
        username,
        password,
        role: 'admin'
      });
      res.status(201).json({
        message: 'Admin user created successfully',
        username: admin.username
      });
    } catch (err) {
      res.status(400).json({ error: 'Failed to create admin user' });
    }
  }
);

module.exports = router;
