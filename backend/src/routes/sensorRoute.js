const express = require('express');
const router = express.Router();
const controller = require('../controllers/sensorController');


router.get('/status/:uuid', controller.getLast);

router.get('/:uuid', controller.getAll);

module.exports = router;