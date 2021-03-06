/** @module UserModel*/


var mongoose = require("../bin/config/mongo");
// DB MODEL
// a schema represents a collection and defines the shape of a document in that collection
var Schema = mongoose.Schema;

/**
 * userSchema={username:String, firstname:String, lastname:String, tel:String, email, String, password:String, role:String}
 * */
var userSchema = new Schema({
    //SESSION
    apikey:  {
        type: String,
        unique: true,
    },
    username:  {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    tel: {
        type: String,
        validate: {
            validator: function(v) {
                var re = /^[0-9]+$/im;
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
    },

    lang:{
        type:String,
        validate: {
            validator: function(v) {
                var re = /^('de'|'en')$/;
                return re.test(v);
            }
        }
    }

});

// convert schema to model. instances of models are documents
var userModel = mongoose.model("User", userSchema);

module.exports = userModel;



