var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


var usersRouter = require('./routes/users');
var photoLogRouter = require('./routes/photo_log/photo_log');
var eventLogRouter = require('./routes/event_log/event_log');
var photosRouter = require('./routes/photos/photos');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/users', usersRouter);
app.use('/photo_log', photoLogRouter);
app.use('/event_log', eventLogRouter);
app.use('/photos', photosRouter);

module.exports = app;