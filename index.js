const express = require('express');
const bodyparser = require('body-parser');
const router = require('./src/routes');
const db = require('./src/helper/db');
const path = require('path');

var app = express();
db.connectDB;

//convert body data to json for nodejs controller
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Set the view engine to EJS and configure the view directories
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use('/', express.static(path.join(__dirname, 'assets')));

app.use('/', router);

const port = 3000;
app.listen(port, () => {
      console.log(`run port= localhost:${port}`)
})
