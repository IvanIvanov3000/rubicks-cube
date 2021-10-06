const mongoose = require('mongoose');


function initDataBase(connectionString) {
    return mongoose.connect(connectionString);
}

module.exports = initDataBase;