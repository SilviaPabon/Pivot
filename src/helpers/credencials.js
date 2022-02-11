const credencials = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database/basedatos'); //cambiar la base de datos
const helpers = require('./helpers.js');

//signup
credencials.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    
    //Se crea el nuevo usuario a insertar en la BD
    const {fullname, lastname, id} = req.body;
    const newUser = {
        fullname,
        lastname,
        id,
        username,
        password,
    };

    newUser.password = await helpers.cifrarContraseña(password);

    //Se valida que no exista el username
    const queryUsername = await pool.query('SELECT * FROM users_pivot WHERE username = ?', [newUser.username]); 

    //Si está disponible, continúa
    if(queryUsername.length == 0){
        
        /*Se inserta el usuario en la BD*/
        await pool.query('INSERT INTO users_pivot SET ?', [newUser]);

        return done(null, newUser); 
    }else{

        //Si el nombre escogido no está disponible
        return done(null, false, req.flash('message', `ERROR: Username ${newUser.username} is already taken`));

    }
}));

credencials.serializeUser((usr, done) => {
    done(null, usr.id);
});

credencials.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users_pivot WHERE id = ?', [id]);
    done(null, rows[0]);
}); 