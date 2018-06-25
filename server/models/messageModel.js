/**
 * @module MessageModel
 */

var mongoose = require('../bin/config/mongo')
var Schema = mongoose.Schema;

/*
 * */
var messageSchema = new Schema({
    // when
    timestamp: Date,
    
    // where
    courseID: String,
    courseSlackID : String,
    
    // who
    userName : String,
    userID: String,
    userSlackID: String,
    
    // what 
    message: String,
    attachment: String
});

var messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
