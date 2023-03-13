const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const register = async (req, res) => {
    const user = await User.create({...req.body});

    res.status(StatusCodes.CREATED).json({token: user.createJWT()});
};

const login = (req, res) => {
    res.send('login suser');
};

module.exports = {
    register,
    login,
}