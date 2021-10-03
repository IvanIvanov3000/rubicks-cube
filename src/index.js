const express = require('express');
const path = require('path');

const initHandlebars = require('./config/handlebars');
const routes = require('./routes');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];


const app = express();

initHandlebars(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));


app.use(routes);

app.listen(config.PORT, () => console.log(`Running on port ${config.PORT}`))