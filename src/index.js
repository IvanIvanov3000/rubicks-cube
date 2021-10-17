const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

const initHandlebars = require('./config/handlebars');
const routes = require('./routes');
const config = require('./config/config')[process.env.NODE_ENV || 'development'];
const initDataBase = require('./config/database');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const app = express();

initHandlebars(app);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(auth);

app.use(express.static(path.join(__dirname, './public')));


app.use(routes);
app.use(errorHandler);

initDataBase(config["DB_CONNECTION_STRING"])
    .then(() => {
        app.listen(config.PORT, () => console.log(`Running on port ${config.PORT}`));
    })
    .catch((err) => {
        console.log(`Error : ${err}`);
    })