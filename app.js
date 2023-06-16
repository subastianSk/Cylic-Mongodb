var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
const {
    checkConnectionDb
} = require('./utils/checkDbConnection');

var app = express();

const cors = require("cors");

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json({
    limit: '100mb'
}));
app.use(express.urlencoded({
    limit: '100mb',
    extended: true
}));
app.use(cookieParser());


// CHECK DB CONNECTION
checkConnectionDb()

app.use('/', indexRouter);



module.exports = app;