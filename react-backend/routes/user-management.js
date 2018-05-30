// parse application/x-www-form-urlencoded
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

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
app.post('/createUser', (req, res) => {

    var user = new userModel(req.body);

    user.save((err, user) => {
        if (err) {
            if(err.code === 11000) {
                console.log("User already exists");                
            } else console.log(err);
            res.send('ERROR');
        } else {
            console.log("saved : " + JSON.stringify(user));
            res.send('OK');
        }
    });    
});

/*
* find user by ID
* */
//app.get
app.post("/readUser", (req, res, next) => {
    userModel.findById(req.body.id, (err, user) => {
        if(err) {
            console.log(err);
            res.send('ERROR');
        } else {            
            res.json({
                "username": user.username,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "telnr": user.telnr,
                "email": user.email
            });
        }
    });
});

/*
* get all users
* */
app.get("/readAllUsers", (req, res, next) => {
    userModel.find({}, (err, user) => {
        if(err) {
            console.log(err);
            res.send('ERROR');
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
app.post("/updateUser", (req, res, next) => {
    userModel.findByIdAndUpdate(req.body.description, req.body, (err, user) => {
        if(err) {
            console.log(err);
            res.send('ERROR');
        }
    });
    res.send('OK');
});

/*
* delete user
* */
//app.del
app.post("/deleteUser", (req, res, next) => {
    userModel.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
            console.log(err);
            res.send('ERROR');
        } else {
            console.log("user " + req.body.username + " removed");
        }
    });
    res.send('OK');
});
