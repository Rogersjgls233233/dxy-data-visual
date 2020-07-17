var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
var cors = require('cors');
var getAllProvinceBasic = require('./api/getAllProvinceBasic');
var getCountryBasic = require('./api/getCountryBasic');
var getCountryNewsCN = require('./api/getCountryNewsCN');
var getProvinceNewsCN = require('./api/getProvinceNewsCN');
var getGender = require('./api/getGender');
var getWordList = require('./api/getWordList');
var getWorldBasic = require('./api/getWorldBasic');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/getAllProvinceBasic', getAllProvinceBasic);
app.get('/getProvinceNewsCN', getProvinceNewsCN);
app.get('/getCountryNewsCN', getCountryNewsCN);
app.get('/getCountryBasic', getCountryBasic);
app.get('/getGender', getGender);
app.get('/getWordList', getWordList);
app.get('/getWorldBasic', getWorldBasic);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
