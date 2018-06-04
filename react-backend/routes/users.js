/** @module User-route */

/** will be module:express */
var express = require("express");
var router = express.Router();


var userModel = require('../models/userModel');
var sessionModel = require('../models/sessionModel');

router.post("/", insertUser);
router.get("/:username", getSingleUser);
router.get("/", getAllUsers);
router.put("/:username", updateUser);
router.delete("/:username", deleteUser);
router.post("/login", login)


/**
 * Insert new User in mongoDB.
 * Sends status code 200 if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function insertUser(req,res,next){
    var user = new userModel(req.body);
    user.role="student";
    try {
        user.save((err) => {
            if (err) {
                console.log("error saving usuer")
                if(err.code === 11000 || err.errors != null) {
                    console.log(err)
                    res.send(400);
                }
            } else {
                res.send(200);
            }
        });
    } catch(err){
        console.log(err.message);
    }

}

/**
 * Get User by requested username.
 * Sends User as JSON if user is in DB else status 404
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function getSingleUser(req,res,next){
        userModel.findOne({ 'username': req.params.username }, function (err, user) {
            if(err || user == null) {
                console.log(err);
                res.status(404);
                res.json({ errorMessage: "Requested user is not found, or the user does not have permission to view it." });
            } else {
                res.json(user);
            }
        });
}

/**
 * Sends an array of users if successed else status code 500
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function getAllUsers(req,res,next){
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
}

/**
 * Update user in mongoDB.
 * Sends status 204 if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function updateUser(req, res, next){
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
}

/**
 * Deletes specific user by username. Sends status 204 if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function deleteUser(req, res, next) {
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
}

/**
 * Checks if user already logged in.
 * If true then it sends status 200.
 * If not check if user exists.
 * If user exists create and send session
 * else sends status 401 (user doesn't exist) or 400 (can't create session)
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function login (req,res,next){
    console.log("router-users:")
    console.log(req.sessionID)
    if(!req.session.user){
        userModel.findOne({ 'username': req.body.username, 'password':req.body.password }, function (err, user) {
            if(err || user == null) {
                console.log("find user error")
                console.log(err);
                res.send(401);
            } else {
                req.session.user=user;
                console.log("ich bin user:")
                console.log(user._id)
                console.log("session")
                console.log(req.sessionID)
                let sessionMod = new sessionModel({'sessionID':req.sessionID,'user':user._id});
                sessionMod.isNew=true;
                try {
                    sessionMod.save((err) => {
                        if (err) {
                            console.log("error saving session")
                            if(err.code === 11000 || err.errors != null) {
                                console.log(err)
                                res.send(400);
                            }
                        } else {
                            res.send(200);
                        }
                    });
                } catch(err){
                    console.log(err.message);
                }
                req.session.save();
                console.log()
            }
        });
    }else{
        console.log("logged")
        res.send(200)
    }
}

module.exports = router;
