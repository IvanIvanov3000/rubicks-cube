const router = require('express').Router();
const authService = require('../services/authService');
const { TOKEN_COOKIE_NAME } = require('../constants');

router.get("/login", (req, res) => {
    res.render('auth/login');
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (username == "" || password == "") {
        res.write(404);
    }

    const user = await authService.login(username, password);
    const token = await authService.createToken(user);

    res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
    });

    res.redirect('/');

});
router.get("/register", (req, res) => {
    res.render("auth/register");
});
router.post("/register", async (req, res, next) => {
    try {
        let { username, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            throw { message: "Passwords dont match" }
        } else if (username == "" || password == "" || repeatPassword == "") {
            throw { message: "All fields are required" };
        }

        await authService.register(username, password);

        res.redirect("/authorization/login");
    } catch (error) {
        console.log(error.message);
        res.status(400).render("auth/register", { error: error.message });
        next(error)
    }


});
router.get("/logout", (req, res) => {
    res.clearCookie(TOKEN_COOKIE_NAME);
    res.redirect("/")
})
module.exports = router;