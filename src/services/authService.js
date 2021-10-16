const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (username, password) => {
    console.log('register', username, password);
    const hashedPassoword = await bcrypt.hash(password, 10);
    return User.create({ username, password: hashedPassoword });
}
const accessoryService = {
    register: register
};

module.exports = accessoryService;;