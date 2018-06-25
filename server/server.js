import bodyParser from 'body-parser'
import express from 'express'
var path = require('path');
var cookieParser = require('cookie-parser');
const app = express()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var contactRouter = require('./routes/contact');
var langRouter = require('./routes/language');
// var sessionuser = require('./routes/sessions');
var messageRouter = require('./routes/messages');
var usercoursemappingRouter=require('./routes/usercoursemapping');

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
// pass the static files (react app) to the express app.
app.use(staticFiles)


var userModel = require('./models/userModel');
app.all('/*', function(req, res,next) {
    console.log(req.get("apikey"))
    userModel.findOne({ 'apikey': req.get("apikey") }, function (err, user) {
        if(err || user == null) {
            console.log("false")
            req.user={role:"guest"}
        } else {
            console.log("true")

            req.user = user
        }
        next();

    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
// app.use('/sessions', sessionuser);
app.use('/contact', contactRouter);
app.use('/lang', langRouter);
app.use('/messages', messageRouter);
app.use('/usercoursemapping', usercoursemappingRouter);

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`)
})