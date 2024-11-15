const { errorResponse } = require('../utils/response.utils');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  return errorResponse(res, err.status || 500, err.message || 'Internal Server Error');
};

module.exports = errorHandler;