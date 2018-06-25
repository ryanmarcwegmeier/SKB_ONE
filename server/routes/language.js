var express = require("express");
var router = express.Router();
var courseModel = require("../models/courseModel");

/* GET home page. */
router.get('/', getLanguages);



function getLanguages(req,res,next){
    courseModel.find({}, 'language' ,(err, course) => {
        if(err) {
            res.statusSend(500);
        } else {
            var courses = course.map((course) => {
                return course.language;
            });
            let langs=Array.from(new Set(courses))
            res.json(langs);
        }
    });
}

module.exports = router;
