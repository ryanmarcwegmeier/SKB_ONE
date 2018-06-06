var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');





var app = express();

//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var sessionuser = require('./routes/sessions');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(session({
    secret:'sessionTesting',
    resave:true,
    saveUninitialized:true,
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set bodyParser to parse the bodies of all incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/sessions', sessionuser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 500 error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
