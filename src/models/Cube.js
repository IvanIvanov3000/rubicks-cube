const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
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
    difficulty: {
        type: Number,
        required: true,
        maxLength: 5,
        minValue: 0
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Accessory"
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;