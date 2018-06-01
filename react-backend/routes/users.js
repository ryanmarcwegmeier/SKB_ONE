var express = require('express');
var router = express.Router();


// MONGODB
var mongoose = require('mongoose');
// format: 'mongodb://<username>:<password>@ds117200.mlab.com:17200/todos'
const url = 'mongodb://localhost/ppsn';
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
    tel: String,
    email: String,
    password: String,
    role:String,
});
// convert schema to model. instances of models are documents
var userModel = mongoose.model('User', userSchema);

/*
* create new user if it doesn't exists
* */
router.post('/createUser', (req, res) => {

    var user = new userModel(req.body);
    user.role="student";
    let code={status:"default"}
    try {
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    console.log("User already exists");
                    code={status: 500, msg: 'user already exists'};
                    return;
                } else console.log(err);
                code={status: 500, msg: 'user already exists'};
                return
            } else {
                code={status: 200, msg: 'User created'};

            }
            res.json(code);
        });

    }catch(err){
        console.log(err.message)
    }


});

/*
* find user by ID
* */
//app.get
router.post("/getUser", (req, res, next) => {
    userModel.find({username:req.body.username, password:req.body.password} ,function (err, user) {
        if(err) {
            console.log(err);
            res.json({status:500, msg:'ERROR: read failed'});
        } else {
            res.json([{session_id:42},user]);
        }
    });
});

router.get("/:id", (req, res, next) => {
    userModel.find({_id:req.params.id} ,function (err, user) {
        if(err) {
            console.log(err);
            res.json({status:500, msg:'ERROR: read failed'});
        } else {
            var users = user.map((user) => {
                return user;
            });
            res.json(users);
        }
    });
});

// router.get("/:id", (req, res, next) => {
//     userModel.find({_id:req.params.id} ,function (err, user) {
//         if(err) {
//             console.log(err);
//             res.json({status:500, msg:'ERROR: read failed'});
//         } else {
//             console.log([user])
//             res.json([user]);
//         }
//     });
// });

/*
* get all users
* */
router.get("/", (req, res, next) => {
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
    console.log(req.body.username)
    userModel.update({username:req.body.username, password:req.body.password}, req.body,  (err, user) => {
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
    var obj={status:0}
    userModel.findByIdAndRemove(req.body._id, (err) => {
        if (err) {
            console.log(err);
           obj.status=500;
           res.json(obj);
        } else {
            console.log("user " + req.body._id + " removed");
            obj.status=200
            res.json(obj);



        }
    });
});

module.exports = router;
