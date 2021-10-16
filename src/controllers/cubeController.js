const express = require('express');
const jwt = require('jsonwebtoken');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const SECRET = require("../constants");
const { isAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

const renderCreate = (req, res) => {

    res.render("cube/create");
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

    const accessories = await accessoryService.getAllWithout(cube.accessories.map(x => x._id));
    if (accessories == undefined) {
        accessories = [];
    }
    res.render("cube/attachAccessory", { cube, accessories: accessories });
}
const attachAccessory = async (req, res) => {
    console.log(req.params.cubeId, req.body.accessory)
    await cubeService.attachAccessory(req.params.cubeId, req.body.accessory);
    res.redirect(`/cube/${req.params.cubeId}`)
}
const getEditPage = (req, res) => {
    if (!req.user) {
        res.redirect("/authorization/login");
    }
    res.render("cube/edit");
}
const getDeletePage = (req, res) => {
    res.render("cube/delete");
}

router.get("/create", renderCreate);
router.post("/create",isAuth, createCube);
router.get("/:cubeId", cubeDetails);
router.get("/:cubeId/edit", getEditPage);
router.get("/:cubeId/delete", getDeletePage);
router.get("/:cubeId/add-accessory",isAuth, addAccessory);
router.post("/:cubeId/add-accessory", isAuth, attachAccessory);
module.exports = router;