const express = require('express');

const cubeService = require('../services/cubeService');


const router = express.Router();

const renderCreate = (req, res) => {
    console.log(cubeService.getAll());
    res.render("create");

}
const createCube = (req, res) => {
    const {name, description, image, difficulty} = req.body;
    cubeService.create(name, description, image, difficulty);
    
    res.redirect("/cube/create");
}

router.get("/create", renderCreate);
router.post("/create", createCube);
module.exports = router;