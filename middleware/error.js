const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    console.log(err.stack + '\n');

    let error = {...err};

    error.message = err.message;

    if(err.name === 'CastError') {
        let message = `Resource with id: ${err.value} not found`;
        error = new ErrorResponse(message, 404);
    } else if(err.code === 11000) {
        const message = `${req.body.name} is already taken`;
        error = new ErrorResponse(message, 400);
    } else if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(err => err.message);
        error = new ErrorResponse(messages, 400);
    }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error'
  });
};

module.exports = errorHandler;