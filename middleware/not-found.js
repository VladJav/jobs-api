const {NotFoundError} = require('../errors');
const { StatusCodes } = require('http-status-codes');

const notFoundMiddleware = (req, res, next) => {
    next(new NotFoundError('Route does not exist', StatusCodes.NOT_FOUND));
};

module.exports = notFoundMiddleware;