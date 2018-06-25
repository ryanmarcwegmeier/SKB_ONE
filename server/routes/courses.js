/** @module Course-route */

/** will be module:express */
var express = require("express");
var router = express.Router();

var courseModel = require('../models/courseModel');
var usercoursemappingModel = require('../models/usercoursemappingModel');
var userModel=require('../models/userModel');
var slackAPI = require("../bin/config/slackAPI.js");

router.post("/", insertCourse);
router.get("/:lang/view", getCoursesByLang)
router.get("/:id", getSingleCourse);
router.get("/", getAllCourses);
router.put("/:id", updateCourse);
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
    //courseModel erstellen
    var course = new courseModel(
        {
            headerStyle:req.body.headerStyle,
            level:req.body.level,
            language:req.body.language,
            day:req.body.day,
            dateStart:req.body.dateStart,
            dateEnd:req.body.dateEnd,
            room:req.body.room,
            description: req.body.description,
            capacity:req.body.capacity,
            isPrivate:false,
            time:req.body.time,
            registrationStart:req.body.registrationStart,
            registrationEnd:req.body.registrationEnd,
    });
    //course speichern
    course.save((err, course) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {

            // create slack channel
            slackAPI.client.channels.create({name : course.language + "-" + course.level})
                .then((res) => {
                    courseModel.updateOne({_id : course._id}, {slackID : res.channel.id}, (err) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("updated slackID of course");
                        }
                    });    
                })
                .catch(console.error);

            //wenn sutdenten eingeladen werden
            if(req.body.students.length!=0) {
                req.body.students.split(";").forEach(e => {

                    //suche user nach email
                    userModel.findOne({email: e}, (err, user) => {
                        if (err) {
                            res.send(400)
                            return
                        } else {
                            // erstelle user course relation
                            var usercoursemapping = new usercoursemappingModel(
                                {
                                    user: user._id,
                                    course: course._id
                                });
                            //speicher user course
                            usercoursemapping.save((err, usercourse) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(400);
                                } else {
                                    //update dekremetiere kapazität
                                    courseModel.updateOne({_id: req.body.course}, {$inc: {capacity: -1}}, (err) => {
                                        if (err) {
                                            res.status(400).json({errorMessage: "Requested course update failed"});
                                            return
                                        } else {
                                            //sende mail
                                            mailing(e, 'de', course)
                                            res.sendStatus(200);
                                            return
                                        }
                                    })
                                }
                            });


                        }

                    })

                })
            }else {
                res.send(200)
            }
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
    console.log("Get single Kurs")
    console.log(req.params.id)
    courseModel.findOne({_id: req.params.id }, function (err, course) {
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
    courseModel.updateOne({_id: req.params.id}, req.body, (err) => {
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
    
    console.log("/courses/delete/:" + req.params.language);
    
    courseModel.findOneAndDelete({language: req.params.language, level: req.params.level}, (err, course) => {
        if (err) {
            res.sendStatus(400);
        } else {
            console.log("course " + req.params.language + "-" + req.params.level + " removed");
            
            // archive and rename slack channel (slack API allows no delete)
            slackAPI.client.channels.archive({channel : course.slackID})
                .then((res) => {
                    console.log(res);
                    slackAPI.client.channels.rename({channel : course.slackID, name : course.title + Date.now()})
                        .then((res) => {
                            console.log(res);
                        })
                        .catch(console.error);
                })
                .catch(console.error);
            // 
            res.sendStatus(200);
        }
    });
}

/**
 * sends a json object of courses (old,now,later => depending on act. time) depending on language
 * @param req
 * @param res
 * @param next
 */
function getCoursesByLang(req,res,next){
    let courseNow=[]
    let courseLater=[]
    let courseOld=[]
    let ownCourse=[]

    usercoursemappingModel.find({user:req.user._id}, {course:1, _id:0}, (err, usercoursemapping) => {
        if(err) {
            res.statusSend(500);
        } else {
            ownCourse=usercoursemapping.map(e=>e.course);
            console.log("my Courses")
            console.log(ownCourse)
            courseModel.find({_id: { $nin: ownCourse},'language':req.params.lang, registrationStart:{$lte:new Date()}, registrationEnd:{$gte:new Date()}}, (err, courseAv) => {
                if(err) {
                    res.send(400);
                    return;
                } else {
                    courseNow=courseAv;
                    console.log("other courses")
                    console.log(courseAv)

                    courseModel.find({'language':req.params.lang, registrationStart:{$gt:new Date()}}, (err, courseLa) => {
                        if(err) {
                            res.send(400);
                            return;
                        } else {
                            courseLater=courseLa;
                            if(req.user.role=='admin'){
                                courseModel.find({'language':req.params.lang, registrationEnd:{$lt:new Date()}}, (err, courseOl) => {
                                    if (err) {
                                        res.send(400);
                                        return;
                                    } else {
                                        courseOld = courseOl;
                                        res.json({now: courseNow, later: courseLater, old:courseOld})
                                        return;
                                    }
                                })
                            }else{
                                res.json({now: courseNow, later: courseLater, old:[]})
                            }
                        }

                    });
                }
            });
        }
    });
}


/**
 * function for sending mail
 * @param mail
 * @param lang
 * @return {number}
 */
function mailing(mail, lang, course){
    console.log(mail)

    var fs = require('fs');
    let htmlText=""

    // if(lang=="de"){
    //     htmlText = fs.readFileSync('../react-backend/messages/mail/mailMessageDE.txt').toString()
    // }
    // if (lang=="en"){
    //     htmlText = fs.readFileSync('../react-backend/messages/mail/mailMessageEN.txt').toString()
    // }

    let link='http://localhost:3000/courses/'+course._id
    htmlText="" +
        "<html>" +
        "<body>" +
        "<h1>Invitation to"+ course.level+" - "+course.language +"</h1>"+
        "<p>You are invited to this course. You can visit the course here:</p>" +
        "<p>" +
        "<a href="+link+">link</a>"+
        "</p>"+
        "<div>Or on your Dashboard</div>"+
        "</body>"
    let transporter = require("../bin/config/mail")

    let HelperOptions = {
        from: '"no-reply" <snetskbone@gmail.com',
        to:mail,
        subject: 'Invitation to Course',
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
