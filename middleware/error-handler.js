const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    };
    if(err.code===11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = 400;
    }
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: customError.msg});
    return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware;