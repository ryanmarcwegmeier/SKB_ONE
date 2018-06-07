/** @module User-route */

/** will be module:express */
var express = require("express");
var router = express.Router();

var userModel = require('../models/userModel');



router.post("/", insertUser);
router.get("/:username", getSingleUser);
router.get("/", getAllUsers);
router.put("/:username", updateUser);
router.delete("/:username", deleteUser);
router.post("/login", login)
//router.post("/logout", logout)
router.post('/email',mailing)


/**
 * Insert new User in mongoDB.
 * Sends status code 200 if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
 
 //Create random Hex String
 function createSecretKey(){
	let key="";
	for(let i=0; i<4;i++){
		key +=Math.floor(Math.random()*Math.pow(16,12)).toString(16);
	}
	return key;
}

function insertUser(req,res,next){
	console.log("create User")
	let data = req.body;
	data.apikey = createSecretKey();
    var user = new userModel(data);
    user.role="student";
        user.save((err) => {
            if (err) {
                res.send(400);
            } else {
                res.send(200);
            }
        });
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
                res.send(404);
            } else {
                console.log("hier the single user:")
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

        userModel.findOne({ 'username': req.body.username, 'password':req.body.password }, function (err, user) {
            if(err || user == null) {
                console.log("find user error")
                console.log(err);
                res.send(401);
            } else {
                res.send(user.apikey);
            }
		});
}

//wird nicht mehr gebruacht, beende deine Session indem du deinen lokalen API-key löschst
/**
 * Clear the session
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler

function logout (req,res,next){
console.log("login out")
    if(!req.session.user){
        res.send(400)
    }else{
        req.session.destroy();
        res.send(200)
    }
}
 */
function mailing(user, lang){
    var fs = require('fs');
    let htmlText=""

    if(lang=="de"){
        htmlText = fs.readFileSync('../react-backend/messages/mail/mailMessageDE.txt').toString()
    }
    if (lang=="en"){
        htmlText = fs.readFileSync('../react-backend/messages/mail/mailMessageEN.txt').toString()
    }
    let transporter = require("../bin/config/mail")

    let HelperOptions = {
        from: '"no-reply" <snetskbone@gmail.com',
        to: user.email,
        subject: 'Registration',
        html:htmlText,
    };

    if(htmlText!=""){

        transporter.sendMail(HelperOptions, (error, info) => {
            if (error) {
                console.log(error)
                return 400
            }else{
                return 200
            }

        });
    }else {
        return 400
    }


}



module.exports = router;
