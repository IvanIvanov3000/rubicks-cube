const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET } = require('../constants');

const register = async (username, password) => {
    //console.log('register', username, password);
    //const hashedPassoword = await bcrypt.hash(password, 10);
    //return User.create({ username, password: hashedPassoword });
    return User.create({ username, password });
}
const login = async (username, password) => {
    let user = await User.findByUsername(username);
    user = user[0];

    try {
        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
            return user;
        } else {
            throw { message: "Invalid password" }
        }
    } catch (err) {
        throw { message: err.message }
    }
}

function createToken(user) {

    let payload = {
        username: user.username,
        _id: user._id,
    }
    return jwtSign(payload, SECRET);
}



function jwtSign(payload, secret) {
    let promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, function (err, token) {
            if (err) {
                reject();
            } else {
                resolve(token);
            }
        })
    });
    return promise;
}

const accessoryService = {
    register,
    login,
    createToken
};

module.exports = accessoryService;;