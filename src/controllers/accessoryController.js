const express = require('express');
const accessoryService = require('../services/accessoryService');

const router = express.Router();


router.get('/create', (req, res) => {

    res.render('accessory/create')
});
router.post('/create', async (req, res) => {
    let { name, description, imageUrl } = req.body;
    try{
        await accessoryService.create(name, description, imageUrl);
    }
    catch(err){
        console.log(err.message);
    }
     

    res.redirect("/");
});
module.exports = router;