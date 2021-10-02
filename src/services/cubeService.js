const Cube = require('../models/Cube');

const cubeDb = [];
const getAll = () => cubeDb.slice();

const create = (name, description, image, difficulty) => {
    let cube = new Cube(name, description, image, difficulty);
    cubeDb.push(cube);
}

const cubeService = {
    create: create,
    getAll: getAll
}
module.exports = cubeService;