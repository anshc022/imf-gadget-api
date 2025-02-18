const { validationResult, check } = require('express-validator');
const logger = require('../utils/logger');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};

const gadgetValidations = {
  create: [
    check('name').trim().notEmpty().withMessage('Name is required')
  ],
  update: [
    check('name').optional().trim().notEmpty(),
    check('status').optional().isIn(['Available', 'Deployed', 'Destroyed', 'Decommissioned']),
    check('missionCount').optional().isInt({ min: 0 }),
    check('lastMissionDate').optional().isISO8601()
  ]
};

const userValidations = {
  register: [
    check('username').trim().notEmpty().isLength({ min: 3 }),
    check('password').isLength({ min: 6 }),
    check('role').isIn(['admin', 'agent', 'technician'])
  ],
  login: [
    check('username').trim().notEmpty(),
    check('password').notEmpty()
  ],
  updateProfile: [
    check('username').optional().trim().notEmpty().isLength({ min: 3 })
  ],
  changePassword: [
    check('currentPassword').notEmpty(),
    check('newPassword').isLength({ min: 6 })
  ]
};

module.exports = { validate, gadgetValidations, userValidations };
