const express = require('express');

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

const router = express.Router();

const renderCreate = (req, res) => {

    res.render("create");
}
const createCube = async (req, res) => {
    try {
        const { name, description, image, difficulty } = req.body;
        await cubeService.create(name, description, image, difficulty);
        res.redirect("/");
    } catch (err) {
        res.status(400).send(err.message).end();
    }


}
const cubeDetails = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    res.render("cube/details", { ...cube });
}
const addAccessory = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    const accessories = await accessoryService.getAll();

    res.render("cube/attachAccessory", { cube, accessories : accessories });
}

router.get("/create", renderCreate);
router.post("/create", createCube);
router.get("/:cubeId", cubeDetails);
router.get("/:cubeId/add-accessory", addAccessory);
module.exports = router;