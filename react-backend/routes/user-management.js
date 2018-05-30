// EXPRESS
var express = require('express');
var app = express();
//app.use(express.static(__dirname));

// parse application/x-www-form-urlencoded
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// set environment variable to override port
app.set('port', process.env.PORT || 3000);

// MONGODB
var mongoose = require('mongoose');
// format: 'mongodb://<username>:<password>@ds117200.mlab.com:17200/todos'
const url = 'mongodb://dbUser01:palpebralf1ssures@ds241530.mlab.com:41530/ppsn';
mongoose.connect(url, (err) => {
    console.log("connected to DB")
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// DB MODEL
// a schema represents a collection and defines the shape of a document in that collection
var Schema = mongoose.Schema;
var userSchema = new Schema({
    userName: String,
    firstName: String,
    lastName: String,
    telNr: Number,
    email: String,
    password: String,
    role: String
});
// convert schema to model. instances of models are documents
var userModel = mongoose.model('User', userSchema);

/*
* create new user if it doesn't exists
* */
app.post('/createUser', (req, res) => {

    var user = new userModel(req.body);

    user.save((err, user) => {
        if (err) {
            if(err.code === 11000) {
                console.log("User already exists");
            } else console.log(err);
        } else {
            console.log("saved : " + JSON.stringify(user));
        }
    });
    res.redirect('/readAllUsers');
});

/*
* find user by ID
* */
//app.get
app.post("/readUser", (req, res, next) => {
    userModel.findById(req.body.id, (err, user) => {
        if(err) {
            console.log(err);
        }
        res.render('showUser', {
            title: 'Details for User: ' + user.userName,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            telNr: user.telNr,
            email: user.email,
            role: user.role
            //password: user.password
        });
    });
});

/*
* get all users
* */
app.get("/readAllUsers", (req, res, next) => {
    userModel.find({}, (err, user) => {
        if(err) {
            console.log(err);
        }

        var users = user.map((user) => {
            return user;
        });
        res.render('readAllUsersSuccess', {title: 'Details for all Users', users: users});
    });
});

/*
* update user
* */
app.post("/updateUser", (req, res, next) => {
    userModel.findByIdAndUpdate(req.body.description, req.body, (err, user) => {
        if(err) {
            console.log(err);
        }
    });
    //TODO: post id
    res.redirect('/readUser');
});

/*
* delete user
* */
//app.del
app.post("/deleteUser", (req, res, next) => {
    userModel.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("user " + req.body.userName + " removed");
        }
    });
    res.redirect('/readAllUsers');
});

//
app.listen(app.get('port'), () => {
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate...' );
})