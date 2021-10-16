const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        minLength: [2, "Username cannot be less than 2 symbols."]
    },
    password: {
        type: 'string',
        required: true
    }

});
userSchema.pre("save", async function(next) {
    const newPassword = await bcrypt.hash(this.password, 10);
    this.password = newPassword;
    next();

})
const User = mongoose.model('User', userSchema);
module.exports = User;