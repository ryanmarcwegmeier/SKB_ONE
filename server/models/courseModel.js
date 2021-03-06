/** @module UserModel*/

var mongoose = require("../bin/config/mongo");
// DB MODEL
var Schema = mongoose.Schema;

/**
 * */
var courseSchema = new Schema({

    headerStyle:{
        type:String
    },

    isPrivate:{
        type:Boolean,
        required:true,
    },

    level:  {
        type: String,
        required: true
    },

    language:{
        type:String,
        required:true,
    },

    day:{
        type:String,
        required:true,
    },

    dateStart: {
        type: Date,
        default: new Date(),
        required:true,
    },
    dateEnd: {
        type: Date,
        required:true,
    },

    registrationStart:{
        type: Date,
        required:true
    },

    registrationEnd:{
        type: Date,
        required:true
    },

    time:{
        type:String,
        require:true,
    },

    room: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    capacity:{
        type:Number,
        required:true,
    },

    slackID : {
        type : String
    }

});

// convert schema to model. instances of models are documents
var courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;
