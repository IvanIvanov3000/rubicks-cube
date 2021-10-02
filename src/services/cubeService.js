const Cube = require('../models/Cube');

const cubeDb = [];
const getAll = () => Cube.getAll();

const create = (name, description, image, difficulty) => {
    let cube = new Cube(name, description, image, difficulty);
    Cube.add(cube);
}

const cubeService = {
    create: create,
    getAll: getAll
}
module.exports = cubeService;