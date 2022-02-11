const express = require('express'); 
const morgan = require('morgan');
const app = express();
require('./helpers/credencials');
const path = require('path')
const session = require('express-session');
require('dotenv').config();
const MySQLbase = require('express-mysql-session');
const {database} = require('./database/llaves');
const credencials = require('passport');

//Settings
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs'); //motor de vista

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

//Middlewares
//cookies
app.use(session({
    secret: process.env.SE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MySQLbase(database)
}));
app.use(morgan('dev')); 
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());
app.use(credencials.initialize());
app.use(credencials.session());

//messages in other views
app.use((req, res, next) => {
    app.locals.success = req.flash('success'); 
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Rutas
const router = require('./routes/ruta.js'); 
app.use('/', router.registro); 
app.use('/welcome', router.registro); 


//Start the server
app.listen(app.get('port'), ()=> {
    console.log(`Server listening on port ${app.get('port')}`);
}); 