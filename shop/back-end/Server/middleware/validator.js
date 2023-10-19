const { body, validationResult } = require('express-validator');

exports.validateLogin = 
[
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (requset, response, next) => {
    const errors = validationResult(requset);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateSignup = 
[
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  (requset, response, next) => {
    const errors = validationResult(requset);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    next();
  }
];




