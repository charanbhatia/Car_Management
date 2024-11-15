const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt.utils');
const { hashPassword, comparePassword } = require('../utils/password.utils');
const { successResponse, errorResponse } = require('../utils/response.utils');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, 'Email already registered');
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const token = generateToken({ userId: newUser._id });
    return successResponse(res, 201, { user: newUser, token });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 401, 'Invalid email or password');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, 'Invalid email or password');
    }
    const token = generateToken({ userId: user._id });
    return successResponse(res, 200, { user, token });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
