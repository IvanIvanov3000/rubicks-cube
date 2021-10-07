const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

const getAll = () => Cube.find({}).lean();

const getOne = (id) => Cube.findById(id).lean();

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
const attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    cube.accessories.push(accessory);
    return cube.save();
}
const cubeService = {
    create: create,
    getAll: getAll,
    getOne: getOne,
    attachAccessory: attachAccessory,
    search: search
}
module.exports = cubeService;