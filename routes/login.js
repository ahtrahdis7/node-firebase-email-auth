var express = require('express');
var router = express.Router();
var firebase = require("firebase");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  
})
module.exports = router;