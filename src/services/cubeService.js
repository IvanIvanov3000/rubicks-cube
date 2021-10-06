const Cube = require('../models/Cube');


const getAll = () => Cube.find({}).lean();

const getOne = (id) => Cube.findById(id);

const search = (text, from, to) => {

    return
    getAll()
        .filter(x => x.name.toLowerCase().includes(text.toLowerCase())
            && x.difficulty >= from && x.difficulty <= to)
}
const create = (name, description, imageUrl, difficulty) => {
    return Cube.create({
        name,
        description,
        imageUrl,
        difficulty,
    });
}

const cubeService = {
    create: create,
    getAll: getAll,
    getOne: getOne
    // search: search
}
module.exports = cubeService;