var express = require('express');
var router = express.Router();
var firebase = require("firebase");



/* GET users listing. */
router.get('/', function(req, res, next) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          // res.body.usesDetails = user;
          // console.log(user);
          console.log(req.body);
          var userId = user.uid;
          writeUserData(userId, req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.username, req.body.other)
    
          if(!user.emailVerified)
            sendEmailVerification();
        } else {
          res.render('error', {"message": "user is not logged in"})
        }
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
      });


  res.render('dashboard');
});

router.post('/', (req, res, next) => {
  
  firebase.auth().signOut().then(function() {
    console.log(" Sign-out successful.")
  }).catch(function(error) {
    // An error happened.
    res.redirect('error', {message: error.message})

  });
  res.redirect('login');
})

module.exports = router;