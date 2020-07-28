var express = require('express');
var router = express.Router();
var firebase = require("firebase");

// function writeUserData(userId, firstname, lastname,phone, email, username, other) {
//   console.log("writing user data to database")
//   firebase.database().ref('users/' + userId).set({
//     firstname: firstname,
//     lastname: lastname,
//     email: email,
//     phone:phone,
//     username: username,
//     other: other
//   });
// }

function sendEmailVerification() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
  // Email sent.
  }).catch(function(error) {
  // An error happened.
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {

    if(req.body){
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
    }
  // console.log(res.body.userDetails);
  res.render('dashboard');
});

module.exports = router;