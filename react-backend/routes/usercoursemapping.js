var express = require('express');
var router = express.Router();
var courseModel = require('../models/courseModel');
var usercoursemappingModel = require('../models/usercoursemappingModel');


router.post("/", registerusercourse);
router.get("/",getmyCourses);


/**
 * return all courses of a single user
 * @param req
 * @param res
 * @param next
 */
function getmyCourses(req,res,next){
    usercoursemappingModel.find({}, (err, usercoursemapping) => {
        if(err) {
            res.statusSend(500);
        } else {
            res.json(usercoursemapping);
        }
    });
}

/**
 * register user into course
 * @param req
 * @param res
 * @param next
 */
function registerusercourse(req, res, next){
    var usercoursemapping = new usercoursemappingModel(
        {
            user:req.body.user,
            course:req.body.course
        });
    usercoursemapping.save((err, usercourse) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            courseModel.updateOne({_id: req.body.course}, { $inc: {capacity: -1}}, (err) => {
                if(err) {
                    res.status(400).json({ errorMessage: "Requested course update failed" });
                    return
                } else {
                    res.sendStatus(200);
                    return
                }
            })
        }
    });

}


module.exports = router;

