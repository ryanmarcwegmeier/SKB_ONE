// DB MODEL
// a schema represents a collection and defines the shape of a document in that collection
var mongoose = require('../bin/config/mongo')
var Schema = mongoose.Schema;
var sessionSchema = new Schema({
    sessionID:  {
        type: String,
        unique: true,
        required: true
    },
    userID: {
        type: String,
        unique: true,
        required: true,

    },
    date_start: {
        type: String,
        required: true,
        default:new Date()
    },


});

// convert schema to model. instances of models are documents

var sessionModel = mongoose.model("Session", sessionSchema );

module.exports = sessionModel;
