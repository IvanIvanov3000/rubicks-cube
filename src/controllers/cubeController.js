const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { isAuth } = require("../middlewares/authMiddleware");
const { isOwnCube } = require("../middlewares/cubeAuthMiddleware");

const validator = require("validator");
const express = require('express');
const router = express.Router();
const renderCreate = (req, res) => {

    res.render("cube/create");
}
const createCube = async (req, res) => {
    try {
        const { name, description, image, difficulty } = req.body;
        // if (!validator.isURL(image)) {
        //    return res.status(400).send("Invalid url");
        // }


        await cubeService.create(name, description, image, difficulty, req.user._id);
        res.redirect("/");
    } catch (err) {

        const errors = Object.keys(err.errors).map(x => err.errors[x].message);

        res.locals.errors = errors;
        res.render("cube/create")
    }


}
const cubeDetails = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    let isOwn;
    if (req.user) {
        isOwn = cube.creator == req.user._id;
        console.log(isOwn);
    }
    res.render("cube/details", { ...cube, isOwn });

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

const getDeletePage = async (req, res) => {
    //let cubeId = req.params.cubeId;
    //let cube = await cubeService.getOne(cubeId)
    res.render("cube/delete", req.cube);
}
const postDeleteCubePage = async (req, res) => {
    await cubeService.deleteOne(req.params.cubeId);
    res.redirect(`/`)
}
const getEditPage = async (req, res) => {
    //const cubeId = req.params.cubeId;
    // const cube = await cubeService.getOne(cubeId);
    res.render("cube/edit", req.cube);
}
const postEditPage = async (req, res) => {

    let { name, description, imageUrl, difficulty } = req.body;
    await cubeService.updateOne(req.params.cubeId, { name, description, imageUrl, difficulty });
    res.redirect(`/cube/${req.params.cubeId}`)
}

router.get("/create", renderCreate);
router.post("/create", isAuth, createCube);
router.get("/:cubeId", cubeDetails);

router.get("/:cubeId/edit", isOwnCube, getEditPage);
router.post("/:cubeId/edit", isOwnCube, postEditPage);

router.get("/:cubeId/delete", isOwnCube, getDeletePage);
router.post("/:cubeId/delete", isOwnCube, postDeleteCubePage);

router.get("/:cubeId/add-accessory", isAuth, isOwnCube, addAccessory);
router.post("/:cubeId/add-accessory", isAuth, isOwnCube, attachAccessory);
module.exports = router;