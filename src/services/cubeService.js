const Cube = require('../models/Cube');

const cubeDb = [];
const getAll = () => Cube.getAll();
const getOne = (id) => Cube.getAll().find(x => x.id === id);

const search = (text, from, to) => {

    return Cube
        .getAll()
        .filter(x => x.name.toLowerCase().includes(text.toLowerCase())
            && x.difficulty >= from && x.difficulty <= to)
}

const create = (name, description, image, difficulty) => {
    let cube = new Cube(name, description, image, difficulty);
    Cube.add(cube);
}

const cubeService = {
    create: create,
    getAll: getAll,
    getOne: getOne,
    search: search
}
module.exports = cubeService;