const express = require('express');
const router = express.Router();
const controller = require('../controller/registroUsuarios.js');
//const protection = require('../libs/nombre_archivo'); 

router.get('/',  controller.signup);

router.post('/', controller.signupPost);