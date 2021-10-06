const express = require('express');

const cubeService = require('../services/cubeService');


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
    const theCube = await cubeService.getOne(req.params.cubeId);

    res.render("details", { ...theCube });
}

router.get("/create", renderCreate);
router.post("/create", createCube);
router.get("/:cubeId", cubeDetails);
module.exports = router;