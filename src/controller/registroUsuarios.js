const controller = {}; 
//const passport = require('passport');
//const pool = require('../database/database'); 

controller.signup = (req, res) => {
    res.render('index');
};

controller.signupPost =  passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/',
    failureFlash: true
});

module.exports = controller; 