const bcrypt = require('bcrypt');
const User = require('../models/User');

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
            throw {message : "Invalid password"}
        }
    } catch (err) {
        throw { message: err.message }
    }

}
const accessoryService = {
    register,
    login
};

module.exports = accessoryService;;