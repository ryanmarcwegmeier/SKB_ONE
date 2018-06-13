/** @module Message-route */

/** will be module:express */
var express = require("express");
var router = express.Router();

var messageModel = require('../models/messageModel');

// create message
router.post("/", insertMessage);
// get message by message_id
router.get("/:id", getMessageByID);
// get message by course_id
router.get("/:course", getMessageByCourse)
// get message by course_id and topic
router.get("/:course", getMessageByCourseAndTopic)
// get message by user_id
router.get("/:user", getMessageByUser)
// update message by message_id
router.put("/:id", updateMessage);
// delete message by message_id
router.delete("/:id", deleteMessageByID);
// delete all messages of specififc user
router.delete("/:user", deleteMessageByUser);
// delete all messages of specific course
router.delete("/:course", deleteMessageByCourse);


/**
 * Insert new message in mongoDB.
 * Sends status code 200 if successed else 400
 * @param {object} req - Requestobject
 * @param {object} res - Respondsobject
 * @param {object} next - Handler
 */
function insertMessage(req, res, next){
    var msg = new messageModel(req.body);
    msg.save((err) => {
        if (err) {
            console.log(err)
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
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
function getMessageByID(req, res, next){
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
function getMessageByCourse(req, res, next){
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

module.exports = router;