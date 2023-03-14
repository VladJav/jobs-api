const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    };
    if(err.code===11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if(err.name === 'ValidationError'){
        customError.msg = Object.keys(err.errors)
            .map((key) => {
            return  err.errors[key].message;
        })
            .join(', ');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.name === 'CastError')
        customError.msg = `Invalid ${err.path}: ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware;