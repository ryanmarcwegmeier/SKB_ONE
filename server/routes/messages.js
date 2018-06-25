/** @module Message-route */

/** will be module:express */
var express = require("express");
var router = express.Router();

var slackAPI = require("../bin/config/slackAPI.js");
var messageModel = require('../models/messageModel');

// create message
router.post("/", insertMessage);
// get message by message_id
router.get("/:id", getMessageByID);
// get message by course_id
router.get("/course/:slackID", getMessageByCourse)
// get message by course_id and topic
//router.get("/:course", getMessageByCourseAndTopic)
// get message by user_id
//router.get("/:user", getMessageByUser)
// update message by message_id
router.put("/:id", updateMessage);
// delete message by message_id
router.delete("/:id", deleteMessageByID);
// delete all messages of specififc user
//router.delete("/:user", deleteMessageByUser);
// delete all messages of specific course
//router.delete("/:course", deleteMessageByCourse);
// listen to slack channels
router.post("/events", listenToSlack);

/**
 * Insert new message in mongoDB.
 * Sends status code 200 if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function insertMessage(req, res, next){
    
    console.log("api/messages/"+req.body.courseSlackID);
    console.log(req.body);
    
    /*
    // post message in slack channel and sign with username
    slackAPI.client.chat.postMessage({ channel: req.body.courseSlackID, text: req.body.message, username: req.body.userName })
    .then((res) => {
        console.log('Message sent: ', res.ts);
    })
    .catch(console.error);
    res.status(200).json({msg: "message send to "});
    */

    var msg = new messageModel(req.body);
    msg.save((err) => {
        if (err) {
            console.log(err)
            res.sendStatus(400);
        } else {    
            // post message in slack channel and sign with username
            slackAPI.client.chat.postMessage({ channel: req.body.courseSlackID, text: req.body.message, username: req.body.userName })
                .then((res) => {
                    console.log('Message sent: ', res.ts);
                })
                .catch(console.error);
            res.status(200).json({msg: "message saved"});
        }
    });
}

/**
 * Get message by id.
 * Sends message as JSON if message is in DB else status 404
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function getMessageByID(req, res, next) {
    messageModel.findOne({_id: req.params.id}, function (err, msg) {
        if(err || msg == null) {
            console.log(err);
            res.status(404);
            res.json({errorMessage: "Requested message is not found, or the user does not have permission to view it."});
        } else {
            res.json(msg);
        }
    });
}

/**
 * Sends all messages of a course as JSON on success else status code 500
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function getMessageByCourse(req, res, next) {

    console.log("api/messages/" + req.params.slackID);

    messageModel.find({ courseSlackID : req.params.slackID }, (err, msg) => {
        if(err) {
            res.statusSend(500);
        } else {
            var messages = msg.map((msg) => {
                return msg;
            });
            res.json(messages);
        }
    });
}

/**
 * Sends all messages of a course and topic as JSON on success else status code 500
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
//TODO: filter by topic
function getMessageByCourseAndTopic(req, res, next){
    messageModel.find({courseID: req.params.course}, (err, msg) => {
        if(err) {
            res.statusSend(500);
        } else {
            var messages = msg.map((msg) => {
                return msg;
            });
            res.json(messages);
        }
    });
}


/**
 * Sends all messages of a user as JSON on success else status code 500
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
//TODO: filter by topic
function getMessageByUser(req, res, next){
    messageModel.find({userID: req.params.user}, (err, msg) => {
        if(err) {
            res.statusSend(500);
        } else {
            var messages = msg.map((msg) => {
                return msg;
            });
            res.json(messages);
        }
    });
}


/**
 * Update message
 * Sends status 204 and updated JSON if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function updateMessage(req, res, next){
    messageModel.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) {
            res.status(400).json({ errorMessage: "Requested message update failed (message not found or invalid field data)." });
        } else {
            res.sendStatus(200);
        }
    })
}

/**
 * Delete message by id. 
 * Sends status 204 on success else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function deleteMessageByID(req, res, next) {
    messageModel.findOneAndDelete({_id: req.params.id}, (err, msg) => {
        if (err) {
            res.send(400);
        } else {
            console.log("message " + req.params.id + " removed");
            res.send(200);
        }
    });
}


/**
 * Delete all messages of specific user
 * Sends status 204 on success else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function deleteMessageByUser(req, res, next) {
    messageModel.findAndDelete({userID: req.params.user}, (err, msg) => {
        if (err) {
            res.send(400);
        } else {
            console.log("all messages of user " + req.params.user + " removed");
            res.send(200);
        }
    });
}


/**
 * Delete all messages of specific course
 * Sends status 204 on success else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function deleteMessageByCourse(req, res, next) {
    messageModel.findAndDelete({courseID: req.params.course}, (err, msg) => {
        if (err) {
            res.send(400);
        } else {
            console.log("all messages of course " + req.params.course + " removed");
            res.send(200);
        }
    });
}

/*
called by slack server if new event happens in one of the channels
the route then saves messages that happened at slack into the DB
*/
function listenToSlack(req, res) {
    console.log("/messages/events");
    
    /* 
    uncomment if setting up event subscription url for slack channel
    to send back the 'challenge' value for verification    
    */
    //res.send({"challenge" : req.body.challenge});
    
    console.log("Event.type: " + req.body.event.type);
    console.log("Event.subtype: " + req.body.event.subtype);
    console.log("Channel: " + req.body.event.channel);
    console.log("User: " + req.body.event.user);
    console.log("Message: " + req.body.event.text);

    //if(req.body.event.type === "message") {
    if(req.body.event.type === "message" && req.body.event.subtype === undefined) {
        
        var msg = new messageModel({
            timestamp : Date.now(),
            courseSlackID : req.body.event.channel,
            userSlackID : req.body.event.user,
            message: req.body.event.text
        });

        // save message
        msg.save((err) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(200);
    }
}

module.exports = router;
