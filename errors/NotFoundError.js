const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require("./CustomAPIError");

class NotFoundError extends CustomAPIError{
    constructor(msg) {
        super(msg, StatusCodes.NOT_FOUND);
    }
}

module.exports = NotFoundError;