var express = require('express');
var router = express.Router();
var firebase = require("firebase");
require('firebase/auth');
require('firebase/database');



router.get('/', function(req, res, next) {
  res.render('signup');
});


router.post('/', function(req, res, next){
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username=req.body.username;
    const phone = req.body.phone;
    const other= req.body.other;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((e) => console.log(e.message));

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

});

module.exports = router;