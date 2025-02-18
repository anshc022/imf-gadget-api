const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, login, updateProfile, changePassword } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { validate, userValidations } = require('../middleware/validate');

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
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
 *                 minLength: 3
 *                 maxLength: 30
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *               role:
 *                 type: string
 *                 enum: [admin, technician, agent]
 *                 default: agent
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username already exists or validation error
 */
router.post('/register', validate(userValidations.register), register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login user
 *     description: Authenticate user and receive JWT token
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
 *                 example: "agent_hunt"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "mission123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: [admin, technician, agent]
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Login failed"
 */

// Public routes
router.post('/login', validate(userValidations.login), login);

// Protected routes
router.get('/me', authenticate, (req, res) => {
  const { password, ...user } = req.user.toJSON();
  res.json(user);
});

router.patch('/me', 
  authenticate,
  validate(userValidations.updateProfile),
  updateProfile
);

router.post('/me/change-password',
  authenticate,
  validate(userValidations.changePassword),
  changePassword
);

module.exports = router;
