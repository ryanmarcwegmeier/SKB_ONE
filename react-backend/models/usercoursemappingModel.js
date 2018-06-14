/** @module UserCourseMappingModel*/


var mongoose = require("../bin/config/mongo");
// DB MODEL
// a schema represents a collection and defines the shape of a document in that collection
var Schema = mongoose.Schema;

/**
 * usercoursemappingSchema={user:String, course:String}
 * */
var usercoursemappingSchema = new Schema({
    user:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    }

});

// convert schema to model. instances of models are documents
var usercoursemappingModel = mongoose.model("UserCourseMapping", usercoursemappingSchema);

module.exports = usercoursemappingModel;



