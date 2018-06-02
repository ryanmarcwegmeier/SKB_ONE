var mongoose = require("../bin/config/mongo");
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
        unique:true,
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

module.exports = userModel;
