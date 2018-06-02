var express = require("express");
var router = express.Router();
var sessionModel = require("../models/sessionModel");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/',(req,res,next)=>{
    let session = new sessionModel({'sessionID':'123456','userID':'21321451' ,'date_start':Date.now(), 'date_end':null});
    try {
        session.save((err) => {
            if (err) {
                console.log(err)
                res.send(400)
            }else{
                res.send(200)
            }
        });
    } catch(err){
        console.log(err.message);
    }
})

module.exports = router;
