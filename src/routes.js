const express = require('express');

const cubeController = require("./controllers/cubeController");
const homeController = require("./controllers/homeController");
const accessoryController = require("./controllers/accessoryController");


const router = express.Router();

router.use("/cube", cubeController);
router.use(homeController);
router.use("/accessory", accessoryController);
//Error
router.use("*", (req, res) => {
    res.render("404");
});

module.exports = router;