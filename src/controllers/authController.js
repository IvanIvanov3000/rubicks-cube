const router = require('express').Router();
const authService = require("../services/authService");

router.get("/login", (req, res) => {
    res.render('auth/login');
});
router.post("/login", (req, res) => {

});


router.get("/register", (req, res) => {
    res.render("auth/register");
});
router.post("/register", async (req, res) => {
    let { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return alert("Passwords don\`t match!");
    } else if (username == "" || password == "" || repeatPassword == "") {
        return alert("All fields are required!");
    }
    await authService.register(username, password);

    res.redirect("authorization/login");

});

module.exports = router;