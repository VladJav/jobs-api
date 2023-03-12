const {CustomAPIError} = require("../errors");
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError){
        res.status(err.statusCode).json({message: err.message});
    }
    else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
}

module.exports = errorHandlerMiddleware;