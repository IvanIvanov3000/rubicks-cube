const express = require('express');
const initHandlebars = require('./config/handlebars');
const path = require('path');

const routes = require('./routes');

const app = express();

initHandlebars(app);

app.use(express.static(path.join(__dirname, './public')));
app.use(routes);


app.listen(3000, () => console.log('Running on port 3000'))