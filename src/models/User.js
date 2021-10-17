const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        unique: true,
        vallidate : [/^[a-zA-Z0-9]+$/i, "Username should contain only endlish letters and numbers!"],
        required: true,
        minLength: [5, "Username cannot be less than 5 symbols."]
    },
    password: {
        vallidate : [/^[a-zA-Z0-9]+$/i, "Password should contain only endlish letters and numbers!"],
        type: 'string',
        required: true,
        minLength: [8, "Password cannot be less than 8 symbols."]

    }

});
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});

userSchema.static('findByUsername', function (username) {
    return this.findOne({ username });
});
userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});
userSchema.virtual('repeatPassword')
    .set(function (v) {
        if (v !== this.password) {
            throw new Error('Password Missmatch');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;