var express = require("express");
var router = express.Router();


var userModel = require('../models/userModel');
var sessionModel = require('../models/sessionModel');

/*
* Create new user
* POST .../users/
*/
router.post("/", (req, res) => {
    var user = new userModel(req.body);
    user.role="student";
    let code={status:"default"};
    try {
        user.save((err) => {
            if (err) {
                if(err.code === 11000 || err.errors != null) {
                    res.send(400);
                }
            } else {
                res.send(200);
            }
        });
    } catch(err){
        console.log(err.message);
    }
});

/*
* Get user
* GET .../users/{username}
*/
router.get("/:username", (req, res, next) => {
    userModel.findOne({ 'username': req.params.username }, function (err, user) {
        if(err || user == null) {
            console.log(err);
            res.status(404);
            res.json({ errorMessage: "Requested user is not found, or the user does not have permission to view it." });
        } else {
            res.json(user);
        }
    });
});

/*
* Get all users
* GET .../users/
*/
router.get("/", (req, res, next) => {
    userModel.find({}, (err, user) => {
        if(err) {
            res.statusSend(500);
        } else {
            var users = user.map((user) => {
                return user;
            });
            res.json(users);
        }
    });
});

/*
* Replace user
* PUT .../users/{username}
*/
router.put("/:username", (req, res, next) => {
    let error400Message = { errorMessage: "Requested user update failed (user not found or invalid field data)." };

    // Query existing user from database
    userModel.findOne({ 'username': req.params.username }, function (err, user) {
        if(err || user == null) {
            res.status(400);
            res.json(error400Message);
        } else {
            //Make sure payload is valid
            if (req.body.firstname != null) { user.firstname = req.body.firstname; }
            if (req.body.lastname != null) { user.lastname = req.body.lastname; }
            if (req.body.tel != null) { user.tel = req.body.tel; }
            if (req.body.email != null) { user.email = req.body.email; }
            if (req.body.password != null) { user.password = req.body.password; }
            if (req.body.role != null) { user.role = req.body.role; }

            user.save((err) => {
                if(err) {
                    res.status(400);
                    res.json(error400Message);
                } else {
                    res.status(204);
                    res.json(user);
                }
            });
        }
    });
});

/*
* Delete user
* DELETE .../users/{username}
*/
router.delete("/:username", (req, res, next) => {
    userModel.findOneAndRemove({username:req.params.username}, (err) => {
        if (err) {
            res.status(400);
            res.json({ errorMessage: "Error occured trying to remove the user." });
        } else {
            console.log("user " + req.params.username + " removed");
            res.status(204);
            res.send();
        }
    });
});

router.post("/login", (req,res,next) => {
    console.log(req.sessionID)
    if(!req.session.user){
        userModel.findOne({ 'username': req.body.username, 'password':req.body.password }, function (err, user) {
            if(err || user == null) {
                console.log(err);
                res.send(401);
            } else {
                req.session.user=user;
                let sessionMod = new sessionModel({sessionID:req.sessionID,userID:user._id});
                try {
                    sessionMod.save((err) => {
                        if (err) {
                            console.log("hier")
                            res.end(400)
                        }
                    });
                } catch(err){
                    console.log(err.message);
                }
                req.session.save();
                console.log(req.sessionID)
                res.json(req.sessionID)
            }


        });
    }else{
        console.log("logged")
        res.send(200)
    }




})


router.post('/session', (req,res,next)=>{
    let session = new sessionModel({'sessionID':'123456','userID':'21321451'});
    try {
        session.save((err) => {
            if (err) {
                console.log("hier")
                res.send(400)
            }else{
                res.send(200)
            }
        });
    } catch(err){
        console.log(err.message);
    }
b
})


module.exports = router;
