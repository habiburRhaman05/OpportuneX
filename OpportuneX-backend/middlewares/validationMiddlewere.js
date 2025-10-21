const { body } = require('express-validator');

exports.validateRegistrationRules = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('FullName must be at least 6 character long'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid Mail Format'),
  body('role').notEmpty().withMessage('Role is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 Character long'),
];

exports.validateLoginRules = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid Mail Format'),
  body('role').notEmpty().withMessage('Role is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 Character long'),
];
