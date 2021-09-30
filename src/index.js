const express = require('express');
const initHandlebars = require('./config/handlebars');

const app = express();


initHandlebars(app);

app.all("/", function (req, res) {
    res.render('index.hbs', { layout: false });
});
app.listen(3000, () => console.log('Running on port 3000'))