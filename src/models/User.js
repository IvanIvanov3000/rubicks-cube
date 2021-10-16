const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username : {
        type: 'string',
        required: true,
        minLength: [2, "Username cannot be less than 2 symbols."]
    },
    password : {
        type: 'string',
        required: true
    }

});

const User = mongoose.model('User', userSchema);
module.exports = User;