exports.successResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({
      success: true,
      data,
    });
  };
  
  exports.errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
      success: false,
      error: message,
    });
  };