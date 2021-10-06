const express = require('express');
const cubeService = require('../services/cubeService');

const router = express.Router();

const home = async (req, res) => {
    let cubes = await cubeService.getAll();

    res.render("index", {
        cubes: cubes
    });
}


const about = (req, res) => {
    res.render("about");
}
const search = (req, res) => {
    let { search, from = 0, to = 5 } = req.query;
    from = Number(from);
    to = Number(to);
    if (to == 0) {
        to = 5;
    }
    /*
    const foundCubes = cubeService.search(search, from, to);
    console.log(foundCubes);

    if (foundCubes.length > 0) {
        res.render("index", { title: "Search", cubes: foundCubes });
    } else {
        res.render("notFound");
    }
    */
    res.render("index", {});

}

router.get("/", home);
router.get("/about", about);
router.get("/search", search);

module.exports = router;