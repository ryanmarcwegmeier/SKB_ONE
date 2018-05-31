var express = require('express');
var router = express.Router();


// MONGODB
var mongoose = require('mongoose');
// format: 'mongodb://<username>:<password>@ds117200.mlab.com:17200/todos'
const url = 'mongodb://localhost:27017/ppsn';
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
    telnr: Number,
    email: String,
    password: String
});
// convert schema to model. instances of models are documents
var userModel = mongoose.model('User', userSchema);



/* GET users listing. */
router.get('/', function(req, res, next) {

    userModel.find({}, (err, user) => {
        if (err) {
            console.log(err);
            res.json('ERROR');
        }

        var users = user.map((user) => {
            return user;
        });
        res.json(users);
    });


});

router.post("/create",function () {
    
})

module.exports = router;