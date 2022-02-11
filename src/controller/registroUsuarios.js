const controller = {}; 
const credencials = require('passport');
const pool = require('../database/basedatos'); 

controller.signup = (req, res) => {
    res.render('index');
};

controller.signupPost =  credencials.authenticate('local.signup', {
    successRedirect: '/welcome',
    failureRedirect: '/',
    failureFlash: true
});

controller.welcome = (req, res) => {
    res.render('welcome.html');
};

module.exports = controller; 