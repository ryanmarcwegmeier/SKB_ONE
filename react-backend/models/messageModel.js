/**
 * @module MessageModel
 */

var mongoose = require('../bin/config/mongo')
var Schema = mongoose.Schema;

/*
 * */
var messageSchema = new Schema({
    timestamp: Date,
    courseID: String,
    userID: String,
    topic: String,
    message: String,
    // save path to file
    attachment: String
});

var messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;