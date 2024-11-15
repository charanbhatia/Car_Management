const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const { errorResponse } = require('../utils/response.utils');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return errorResponse(res, 401, 'No token provided');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    return errorResponse(res, 401, 'Invalid token');
  }
};

module.exports = authenticate;