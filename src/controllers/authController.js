const router = require('express').Router();
const authService = require("../services/authService");

router.get("/login", (req, res) => {
    res.render('auth/login');
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (username == "" || password == "") {
        res.write(404);
    }

    try {
        const user = await authService.login(username, password);
        const token = await authService.createToken(user);
        res.cookie("app_token", token, {
            httpOnly : true
        })


    } catch (err) {
        console.log(err);
        return res.redirect("/404");
    }
    res.redirect("/");

});


router.get("/register", (req, res) => {
    res.render("auth/register");
});
router.post("/register", async (req, res) => {
    let { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        throw { message: "Passwords dont match" }
    } else if (username == "" || password == "" || repeatPassword == "") {
        throw { message: "All fields are required" };
    }
    await authService.register(username, password);
    res.redirect("/authorization/login");

});

module.exports = router;