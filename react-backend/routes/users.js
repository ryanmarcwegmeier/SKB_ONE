var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
router.get('/', function(req, res, next) {

    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
        if (err) throw err;
        var dbo = db.db("PPSN");
        //Exclude the _id field from the result:
        dbo.collection("User").find({}, { _id: 0, name: 1, adress: 1 }).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});

module.exports = router;