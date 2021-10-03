const uniqid = require('uniqid');

class Cube {
    static #cubes = [
        {
            id: "dwadawdawdaddcrgtgtge",
            name: "Mirror Cube",
            description: "Some cube",
            image: "https://m.media-amazon.com/images/I/61xKF56d15L._AC_UX569_.jpg",
            difficulty: 4
        }
    ];

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
module.exports = Cube;