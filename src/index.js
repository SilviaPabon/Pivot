const express = require('express'); 
const morgan = require('morgan');
const app = express();
const path = require('path')
const session = require('express-session');
require('dotenv').config();
const MySQLStore = require('express-mysql-session');
const {database} = require('./database/llaves');
const passport = require('passport');

//Settings
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views'));

//Static files
app.use(express.static(path.join(__dirname, 'views'))); 

//Middlewares
//cookies
app.use(session({
    secret: process.env.SE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(morgan('dev')); 

//Start the server
app.listen(app.get('port'), ()=> {
    console.log(`Server listening on port ${app.get('port')}`);
}); 