const express = require('express');
const router = express.Router();
const controller = require('../controller/registroUsuarios.js');

router.get('/',  controller.signup);