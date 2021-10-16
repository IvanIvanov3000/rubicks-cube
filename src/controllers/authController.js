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

    try{
        const user = await authService.login(username, password);
    }catch(err){
        res.redirect("/404");
    }
    res.redirect("/")

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

    res.redirect("/authorization/login");

});

module.exports = router;