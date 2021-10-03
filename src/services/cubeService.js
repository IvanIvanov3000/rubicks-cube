const Cube = require('../models/Cube');

const cubeDb = [];
const getAll = () => Cube.getAll();
const getOne = (id) => Cube.getAll().find(x => x.id === id);


const create = (name, description, image, difficulty) => {
    let cube = new Cube(name, description, image, difficulty);
    Cube.add(cube);
}

const cubeService = {
    create: create,
    getAll: getAll,
    getOne: getOne
}
module.exports = cubeService;