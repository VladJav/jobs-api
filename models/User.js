const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 20,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        minLength: 3,
        maxLength: 50,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 6,
    },
});

userSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function (){
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
}

userSchema.methods.checkPassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}
module.exports = mongoose.model('User', userSchema);