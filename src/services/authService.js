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
const login = function (username, password) {
    return User.findByUsername(username)
        .then(user => Promise.all([user.validatePassword(password), user]))
        .then(([isValid, user]) => {
            if (isValid) {
                return user;
            } else {
                throw { message: 'Cannot find username or password'}
            }
        })
        .catch(() => null);
}

const createToken = function(user) {
    let payload = {
        _id: user._id,
        username: user.username,
    }

    return jwtSign(payload, SECRET);

    // return new Promise((resolve, reject) => {
    //     jwt.sign(payload, SECRET, function(err, token) {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(token);
    //         }
    //     })
    // });
};



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