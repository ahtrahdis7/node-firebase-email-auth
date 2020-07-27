var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function(req, res, next){
    // var email = req.body.email;
    console.log(req.body);

    res.redirect('/otp');
});

module.exports = router;