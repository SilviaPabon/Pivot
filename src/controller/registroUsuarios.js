const controller = {}; 
//const passport = require('passport');
//const pool = require('../database/database'); 

controller.signup = (req, res) => {
    res.render('/src/index.html');
};

/* controller.signupPost =  passport.authenticate('local.signup', {
    successRedirect: '/users/signin',
    failureRedirect: '/users/signup',
    failureFlash: true
}); */

module.exports = controller; 