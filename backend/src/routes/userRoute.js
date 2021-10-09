const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/createUser', controller.create);

router.post('/login', controller.login);

router.get('/status/:id', controller.getUser);

module.exports = router;