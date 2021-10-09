const express = require('express');
const router = express.Router();
const controller = require('../controllers/deviceController')

router.post('/create', controller.post);

router.get('/status/:uuid', controller.get);

module.exports = router;
