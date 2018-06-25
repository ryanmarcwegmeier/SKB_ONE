var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {

    let transporter = require("../bin/config/mail");

    let HelperOptions = {
        from: '<User-Contact>',
        to: 'snetskbone@gmail.com',
        replyTo: req.body.email,
        subject: req.body.re,
        html:req.body.message + "<p><hr/>" + req.body.email + "</p>",
    };

    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.send(400)
        }else{
            res.send(200)
        }

    });
});

module.exports = router;

