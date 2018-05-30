var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    // res.end(200);
    if(req.body.username=='ryan' && req.body.password=='test')
    res.json("{status:200}")
    else res.json({status:400})
});

router.get('/', function(req, res, next) {
    alert("GET");
});

module.exports = router;
