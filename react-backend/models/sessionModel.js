/**
 * @module SessionModel
 */

// DB MODEL
// a schema represents a collection and defines the shape of a document in that collection
var mongoose = require('../bin/config/mongo')
var Schema = mongoose.Schema;

/**
 * sessionSchema={
 * username:String,
 * firstname:String,
 * lastname:String,
 * tel:String, email,
 * String, password:String,
 * role:String}
 * */
var sessionSchema = new Schema({

    sessionID:  {
        type: String,
    },
    user: {
        type: String,

    },
    date_start: {
        type: String,
        default:new Date()
    },


});

// convert schema to model. instances of models are documents

var sessionModel = mongoose.model("Session", sessionSchema );

module.exports = sessionModel;
