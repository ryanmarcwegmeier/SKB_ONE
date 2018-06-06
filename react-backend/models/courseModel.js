/** @module UserModel*/

var mongoose = require("../bin/config/mongo");
// DB MODEL
var Schema = mongoose.Schema;

/**
 * courseSchema={title: String, teachers: Array, students: Array, date: Date, room: String, description: String, credits: Number}
 * */
var courseSchema = new Schema({
    title:  {
        type: String,
        unique: true,
        required: true
    },
    teachers: [
        {name: String}
    ],
    students: [
        {name: String}
    ],
    date: {
        type: Date,
        //required: true
    },
    room: {
        type: String,
        unique: true,
        required: true             
    },
    description: {
        type: String
    },
    credits: {
        type: Number,
        required: true
    }
});

// convert schema to model. instances of models are documents
var courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;



