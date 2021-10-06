const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
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
    difficulty: {
        type: Number,
        required: true,
        maxLength: 5,
        minValue: 0
    }
});

const Cube = mongoose.model("Cube", cubeSchema);
/*
class Cube {

    constructor(name, description, image, difficulty) {
        this.id = uniqid();
        this.name = name;
        this.description = description;
        this.image = image;
        this.difficulty = difficulty;
    }

    static getAll() {
        return Cube.#cubes.slice();
    }

    static add(cube) {
        Cube.#cubes.push(cube);
    }
}
*/
module.exports = Cube;