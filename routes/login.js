var express = require('express');
var router = express.Router();
var firebase = require("firebase");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {

  var actionCodeSettings = {
    url: 'http://localhost:3000/dashboard',
    handleCodeInApp: true,
  };


  firebase.auth().sendSignInLinkToEmail(req.body.email, actionCodeSettings)
  .then(function() {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    // window.localStorage.setItem('emailForSignIn', email);
    console.log('Sign in Link has been sent')
  })
  .catch(function(error) {
    // Some error occurred, you can inspect the code: error.code
    res.redirect('error', {message: error.message})
  });
  res.redirect('haltpage')
})

module.exports = router;