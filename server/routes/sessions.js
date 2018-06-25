var express = require("express");
var router = express.Router();
var sessionModel = require("../models/sessionModel");
var userModel = require('../models/userModel');

/* GET home page. */
router.get('/', getUserBySession);


module.exports = router;

function getUserBySession(req,res,next){
    console.log('nav')
    console.log(req.session.user)
    if(!req.session.user){
        res.send(401)
    }else{
        console.log("suche session")
        sessionModel.findOne({ 'sessionID': req.sessionID }, function (err, session) {
            if(err || session == null) {
                console.log(err);
                res.status(404);
            } else {
                userModel.findOne({_id:session.user}, function (err,user) {
                    if(err || session == null) {
                        console.log(err);
                        res.end(404);
                    }else{
                        res.json(user);
                    }
                })
            }
        })}
    }
