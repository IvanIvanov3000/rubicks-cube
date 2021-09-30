const express = require('express');
const app = express();

app.all("/", function (req, res) {
    res.write('Hello');
    res.end();
});
app.listen(3000, () => console.log('Running on port 3000'))