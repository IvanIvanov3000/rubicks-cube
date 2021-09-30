const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');

app.set("views", path.resolve("./src/views"))
app.engine("hbs", handlebars({
    extname: "hbs"
}));
app.set('view engine', "hbs")

app.all("/", function (req, res) {
    res.render('index.hbs', { layout: false });
});
app.listen(3000, () => console.log('Running on port 3000'))