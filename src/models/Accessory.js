const mongoose = require('mongoose');
const accessoryShema = new mongoose.Shema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: [true, "Image Url is required"],
        validate: [/^https?:\/\//, "Wrong image format. Image should be an http link"]
    },
    description: {
        type: String,
        required: [true, "Image Url is required"],
        maxLength: 50
    }
});

const Accessory = mongoose.model('Accessory', accessoryShema);
module.exports = Accessory;