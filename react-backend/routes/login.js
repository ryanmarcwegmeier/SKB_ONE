var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    res.redirect('http://localhost:3000/index');
});

module.exports = router;
