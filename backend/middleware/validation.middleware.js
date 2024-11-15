const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response.utils');

const validateSignup = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, errors.array().map((error) => error.msg).join(', '));
    }
    next();
  },
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, errors.array().map((error) => error.msg).join(', '));
    }
    next();
  },
];

const validateCar = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('tags').isArray().withMessage('Tags must be an array'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, errors.array().map((error) => error.msg).join(', '));
    }
    next();
  },
];

module.exports = {
  validateSignup,
  validateLogin,
  validateCar,
};