const express = require('express');
const initHandlebars = require('./config/handlebars');
const path = require('path');

const app = express();

initHandlebars(app);

app.use(express.static(path.join(__dirname, './public')));

app.all("/", function (req, res) {
    res.render('index.hbs', { layout: false });
});
app.listen(3000, () => console.log('Running on port 3000'))