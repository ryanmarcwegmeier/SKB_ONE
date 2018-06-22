var express = require('express');
var router = express.Router();

var userModel = require('../models/userModel');
var courseModel = require('../models/courseModel');
var usercoursemappingModel = require('../models/usercoursemappingModel');


router.post("/", registerusercourse);
router.get("/courses/",getmyCourses);
router.get("/isuser/:courseId",getUsers);



function getUsers(req,res,next){
    console.log("courseID")
console.log(req.params.courseId)
    usercoursemappingModel.find({course:req.params.courseId, user:req.user._id}, (err, usercoursemapping) => {
        if(err) {
            res.statusSend(500);
        } else {
            console.log("i bims")
            if(usercoursemapping.length>0 || req.user.role=='admin'){
                console.log("i bims2")

                res.json(true)
            }else{
                console.log("i bims3")
                console.log(usercoursemapping)

                res.json(false)
            }
        }
    });
}


/**
 * return all courses of a single user
 * @param req
 * @param res
 * @param next
 */
function getmyCourses(req,res,next){
    console.log("MEINE KURSE SIND")
    console.log(req.user.username)
    let courseids={}
    usercoursemappingModel.find({user:req.user._id}, {course:1, _id:0}, (err, usercoursemapping) => {        if(err) {
            res.statusSend(500);
        } else {
            courseids=usercoursemapping.map(e=>e.course);
            courseModel.find({_id: { $in: courseids}},(err, courses) => {
                if(err) {
                    res.send(400);
                    return;
                } else {
                    res.send(courses)
                }

                }
                )
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

