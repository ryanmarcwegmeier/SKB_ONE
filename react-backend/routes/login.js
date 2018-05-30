var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    res.json({greeting: "hello"})
});

router.get('/', function(req, res, next) {
    alert("GET");
});

module.exports = router;
