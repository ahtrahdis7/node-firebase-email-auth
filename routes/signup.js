var express = require('express');
var router = express.Router();
var firebase = require("firebase");
// var database = firebase.database();
require('firebase/auth');
require('firebase/database');

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }



var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url:  "http://localhost:3000/dashboard/",
    // This must be true.
    handleCodeInApp: true,
  };

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});


router.post('/', function(req, res, next){
    // var email = req.body.email;
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username=req.body.username;
    const phone = req.body.phone;
    const other= req.body.other;
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     if (errorCode == 'auth/weak-password') {
    //         console.log('The password is too weak.');
    //     } else {
    //         console.log(errorMessage);
    //     }
    //     res.redirect('error', {"message": errorCode})
    //     // ...
    // });

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((e) => console.log(e.message));

    // sleep(5000);
	firebase.auth().onAuthStateChanged((firebaseUser) => {
        // console.log(firebaseUser);
        if(firebaseUser.emailVerified == false)
            firebaseUser.sendEmailVerification().then(function() {
                console.log("Sent Email Verification")
            }).catch(function(error) {
                console.log('Error during sending Email Verification')
            });
            
		if (firebaseUser) {
            firebase.database().ref('users/' + firebaseUser.uid).set({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone:phone,
                username: username,
                other: other
              });
            console.log('Data Sent!');
            res.redirect('/login');
		} else {
			console.log('error');
			res.redirect('/signup');
		}
    });
    // sleep(5000);
    
	res.redirect('/login');
    // firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings).then(function() {
    //     // Save the email locally so you don’t need to ask the user for it again if they open
    //     // the link on the same device.
    //     // window.localStorage.setItem('emailForSignIn', email);
    //     // The link was successfully sent. Inform the user.
    //     console.log('An email was sent to ' + email + '. Please use the link in the email to sign-in.');
    //     // [START_EXCLUDE]
    //     // Re-enable the sign-in button.
    //     // [END_EXCLUDE]
    // }).catch(function(error) {
    //     // han             dleError(error);
    //     res.redirect('error', {"message": error})

    // });

    // handleSignIn(email);
    // initApp();
    // res.redirect('dashboard', req.body);
    
});

module.exports = router;