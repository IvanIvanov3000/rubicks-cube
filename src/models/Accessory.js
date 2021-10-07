const mongoose = require('mongoose');

const accessoryShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 100
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\//i.test(v);
            },
            message: props => `${props.value} is not a valid url!`

        }
    },
});

const Accessory = mongoose.model('Accessory', accessoryShema);
module.exports = Accessory;