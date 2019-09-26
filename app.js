var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var engine = require("ejs-locals");

require("dotenv").config();

// router package
var registerURL = require("./routes/url");
var authRouter = require("./routes/authorize");
var bookRouter = require("./routes/book");

var app = express();

// view engine setup
app.engine("ejs", engine);
app.set('views', path.join(__dirname, 'views')); // 這行可以不用
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use("/url", registerURL);
app.use("/authorize", authRouter);
app.use("/book", bookRouter);

/* ！！！！！！！   Cannot use "app.use"   ！！！！！！！！ */
//app.use('/', function (req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'))
//    console.log(__dirname + '/index.html');
//});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
