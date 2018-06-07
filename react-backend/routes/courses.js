/** @module Course-route */

/** will be module:express */
var express = require("express");
var router = express.Router();

var courseModel = require('../models/courseModel');

router.post("/", insertCourse);
router.get("/:lang/view", getCoursesByLang)
router.get("/:id", getSingleCourse);
router.get("/", getAllCourses);
router.put("/", updateCourse);
router.delete("/:id", deleteCourse);

/**
 * Insert new course in mongoDB.
 * Sends status code 200 if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function insertCourse(req, res, next){
    console.log("insertCourse()");
    let teacher=[]
    req.body.teachers.split(",").forEach(e=>{
        teacher.push({name:e})
    })
    let student=[]
    req.body.students.split(",").forEach(e=>{
        student.push({name:e})
    })


    var course = new courseModel(
        {
            level:req.body.level,
            language:req.body.language,
            teachers:teacher,
            students:student,
            day:req.body.day,
            dateStart:req.body.dateStart,
            dateEnd:req.body.dateEnd,
            room:req.body.room,
            description: req.body.description,
            capacity:req.body.capacity

    });
    console.log(course.nummer)
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
    courseModel.findOne({id: req.params.id }, function (err, course) {
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
                let teachers=course.teachers.map(teacher=>{
                    return teacher
                })
                course.teachers=teachers;
                return course
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
    courseModel.findOneAndDelete({_id: req.params.id}, (err, course) => {
        if (err) {
            res.send(400);
            // res.json({ errorMessage: "Error occured trying to remove the course." });
        } else {
            console.log("course " + req.params.id + " removed");
            res.send(200);
            // res.json(course);
        }
    });
}

function getCoursesByLang(req,res,next){
    console.log("____________________________________________________dsvdsfsfdsaofdgfogfodgfoa________________________________________")
    console.log(req.params.lang)
    courseModel.find({'language':req.params.lang}, (err, course) => {
        if(err) {
            res.statusSend(500);
        } else {
            var courses = course.map((course) => {
                let teachers=course.teachers.map(teacher=>{
                    return teacher
                })
                course.teachers=teachers;
                return course
            });
            console.log(courses)
            res.json(courses);
        }
    });}

module.exports = router;