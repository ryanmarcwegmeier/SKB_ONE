var express = require("express");
var router = express.Router();

// MONGODB
var mongoose = require("mongoose");
// format: 'mongodb://<username>:<password>@ds117200.mlab.com:17200/todos'
const url = "mongodb://localhost/ppsn";
mongoose.connect(url, (err) => {
	console.log("connected to DB");
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// DB MODEL
// a schema represents a collection and defines the shape of a document in that collection
var Schema = mongoose.Schema;
var userSchema = new Schema({
	username:  {
		type: String,
		unique: true,
		required: true
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	tel: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
				return re.test(v);
			}
		}
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(v);
			}
		}
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String
	}
});

// convert schema to model. instances of models are documents
var userModel = mongoose.model("User", userSchema);

/*
* Create new user
* POST .../users/
*/
router.post("/", (req, res) => {
	var user = new userModel(req.body);
	user.role="student";
	let code={status:"default"};
	try {
		user.save((err) => {
			if (err) {
				if(err.code === 11000 || err.errors != null) {
					console.log("wrong post data");
					res.status(400);		
					let msg = "User exists alreaydy or input is invalid (e.g. missing required fields, invalid field values, and so forth).";
					code = { errorMessage: msg };
				}
			} else {
				res.status(201);
				code = user;
			}
			res.json(code);
		});
	} catch(err){
		console.log(err.message);
	}
});

/*
* Get user
* GET .../users/{username}
*/
router.get("/:username", (req, res, next) => {
	userModel.findOne({ 'username': req.params.username }, function (err, user) {
		if(err || user == null) {
			console.log(err);
			res.status(404);
			res.json({ errorMessage: "Requested user is not found, or the user does not have permission to view it." });
		} else {
			res.json(user);
		}
	});
});

/*
* Get all users
* GET .../users/
*/
router.get("/", (req, res, next) => {
	userModel.find({}, (err, user) => {
		if(err) {
			res.statusSend(500);
		} else {
			var users = user.map((user) => {
				return user;
			});
			res.json(users);
		}
	});
});

/*
* Replace user
* PUT .../users/{username}
*/
router.put("/:username", (req, res, next) => {
	let error400Message = { errorMessage: "Requested user update failed (user not found or invalid field data)." };

	// Query existing user from database
	userModel.findOne({ 'username': req.params.username }, function (err, user) {
		if(err || user == null) {
			res.status(400);
			res.json(error400Message);
		} else {
			//Make sure payload is valid
			if (req.body.firstname != null) { user.firstname = req.body.firstname; }
			if (req.body.lastname != null) { user.lastname = req.body.lastname; }
			if (req.body.tel != null) { user.tel = req.body.tel; }
			if (req.body.email != null) { user.email = req.body.email; }
			if (req.body.password != null) { user.password = req.body.password; }
			if (req.body.role != null) { user.role = req.body.role; }

			user.save((err) => {
				if(err) {
					res.status(400);
					res.json(error400Message);
				} else {
					res.status(204);
					res.json(user);
				}
			});
		}
	});
});

/*
* Delete user
* DELETE .../users/{username}
*/
router.delete("/:username", (req, res, next) => {
	userModel.findOneAndRemove({username:req.params.username}, (err) => {
		if (err) {
			res.status(400);
			res.json({ errorMessage: "Error occured trying to remove the user." });
		} else {
			console.log("user " + req.params.username + " removed");
			res.status(204);
			res.send();
		}
	});
});

module.exports = router;
