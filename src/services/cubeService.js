const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

const getAll = () => Cube.find({}).lean();

const getOne = (id) => Cube.findById(id).populate("accessories").lean();


const search = async (text, from, to) => {
    const all = await getAll();
    const filtered = all.filter(x => x.name.toLowerCase().includes(text.toLowerCase())
        && x.difficulty >= from && x.difficulty <= to
    );
    return filtered;
}
const create = (name, description, imageUrl, difficulty, creatorId) => {
    return Cube.create({
        name,
        description,
        imageUrl,
        difficulty,
        creator: creatorId
    });
}
const attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    cube.accessories.push(accessory);
    return cube.save();
}
const deleteOne = (cubeId) => {
    return Cube.findByIdAndDelete(cubeId);
}
const updateOne = (cubeId, data) => Cube.findByIdAndUpdate(cubeId, data);


const cubeService = {
    create: create,
    getAll: getAll,
    getOne: getOne,
    attachAccessory: attachAccessory,
    search: search,
    deleteOne: deleteOne,
    updateOne: updateOne
}
module.exports = cubeService;