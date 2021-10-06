const express = require('express');
const path = require('path');

const initHandlebars = require('./config/handlebars');
const routes = require('./routes');
const config = require('./config/config')[process.env.NODE_ENV || 'development'];
const initDataBase = require('./config/database');


const app = express();

initHandlebars(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));


app.use(routes);


initDataBase(config["DB_CONNECTION_STRING"])
    .then(() => {
        app.listen(config.PORT, () => console.log(`Running on port ${config.PORT}`));
    })
    .catch((err) => {
        console.log(`Error : ${err}`);
    })