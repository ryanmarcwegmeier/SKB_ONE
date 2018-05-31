var express = require('express');
// require('express').Router();
var router = express.Router();

/* should be available from app.js
// parse application/x-www-form-urlencoded
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
*/

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
    username: String,
    firstname: String,
    lastname: String,
    tel: Number,
    email: String,
    password: String
});
// convert schema to model. instances of models are documents
var userModel = mongoose.model('User', userSchema);

/*
* create new user if it doesn't exists
* */
router.post('/createUser', (req, res) => {

    var user = new userModel(req.body);

    user.save((err, user) => {
        if (err) {
            if(err.code === 11000) {
                console.log("User already exists");
                res.send(500, 'user already exists');
            } else console.log(err);
            res.send(500, 'ERROR: create failed');
        } else {
            console.log("saved : " + JSON.stringify(user));
            res.send(200, 'user created');
        }
    });
});

/*
* find user by ID
* */
//app.get
router.post("/readUser", (req, res, next) => {
    userModel.findById(req.body.id, (err, user) => {
        if(err) {
            console.log(err);
            res.send(500, 'ERROR: read failed');
        } else {
            res.json(user);
        }
    });
});

/*
* get all users
* */
router.get("/readAllUsers", (req, res, next) => {
    userModel.find({}, (err, user) => {
        if(err) {
            console.log(err);
            res.send(500, 'ERROR: read failed');
        } else {
            var users = user.map((user) => {
                return user;
            });
            res.json(users);
        }
    });
});

/*
* update user
* */
router.post("/updateUser", (req, res, next) => {
    userModel.update(req.body, req.body, (err, user) => {
        if(err) {
            console.log(err);
            res.send(500, 'ERROR: update failed');
        }
    });
    res.send(200, 'user updated');
});

/*
* delete user
* */
router.post("/deleteUser", (req, res, next) => {
    userModel.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
            console.log(err);
            res.send(500, 'ERROR: delete failed');
        } else {
            console.log("user " + req.body.username + " removed");
        }
    });
    res.send(200, 'user deleted');
});

module.exports = router;
