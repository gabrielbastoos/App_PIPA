const express = require('express');
const router = express.Router();
const SensorRepo = require('../repo/sensorRepo');

router.get('/', async (req, res) => {
    let resp = await SensorRepo.findLast();
    if (resp.hasError){
       res.sendStatus(500);
    }
    res.json(resp);
});

module.exports = router;