/** @module Course-route */

/** will be module:express */
var express = require("express");
var router = express.Router();

var courseModel = require('../models/courseModel');

router.post("/", insertCourse);
router.get("/:title", getSingleCourse);
router.get("/", getAllCourses);
router.put("/", updateCourse);
router.delete("/:title", deleteCourse);

/**
 * Insert new course in mongoDB.
 * Sends status code 200 if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function insertCourse(req, res, next){
    console.log("insertCourse()");
    console.log(JSON.stringify(req.body));
    var course = new courseModel(req.body);
    course.save((err, course) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.sendStatus(201);
        }
    });    
}

/**
 * Get Course by requested title.
 * Sends Course as JSON if course is in DB else status 404
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function getSingleCourse(req, res, next){
    courseModel.findOne({title: req.params.title }, function (err, course) {
        // if error or course not exists
        if(err || course == null) {
            console.log(err);
            res.status(404);
            res.json({ errorMessage: "Requested course is not found, or the user does not have permission to view it." });
        } else {
            res.json(course);
        }
    });
}

/**
 * Sends an array of courses if successed else status code 500
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function getAllCourses(req, res, next){
    courseModel.find({}, (err, course) => {
        if(err) {
            res.statusSend(500);
        } else {
            var courses = course.map((course) => {
                return course;
            });
            res.json(courses);
        }
    });
}

/**
 * Update course in mongoDB.
 * Sends status 204 and updated JSON if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function updateCourse(req, res, next){
    courseModel.updateOne({title: req.body.title}, req.body, (err) => {
        if(err) {
            res.status(400).json({ errorMessage: "Requested course update failed (course not found or invalid field data)." });
        } else {
            res.sendStatus(200);
        }
    })
}

/**
 * Deletes specific course by title. Sends status 204 if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function deleteCourse(req, res, next) {
    courseModel.findOneAndDelete({title: req.params.title}, (err, course) => {
        if (err) {
            res.status(400);
            res.json({ errorMessage: "Error occured trying to remove the course." });
        } else {
            console.log("course " + req.params.title + " removed");
            //res.sendStatus(200);
            res.json(course);
        }
    });
}

module.exports = router;