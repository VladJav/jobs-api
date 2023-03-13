const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError} = require('../errors');

const register = async (req, res) => {
    const user = await User.create({...req.body});

    res.status(StatusCodes.CREATED).json({token: user.createJWT()});
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new BadRequestError('Please, provide email and password');
    }

    const user = await User.findOne({ email });

    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.checkPassword(password);

    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    res.status(StatusCodes.OK).json({token: user.createJWT()});
};

module.exports = {
    register,
    login,
}