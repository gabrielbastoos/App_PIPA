const express = require('express');
const router = express.Router();
const SensorRepo = require('../repo/sensorRepo');

router.get('/status/:uuid', async (req, res) => {
    const  { uuid } = req.params;
    let resp = await SensorRepo.findLast(uuid);
    if (resp.hasError){
       res.sendStatus(500);
    }
    res.json(resp);
});

router.get('/:uuid', async (req, res) => {
    const { uuid } = req.params;
    let resp = await SensorRepo.findAll(uuid);
    if (resp.hasError){
       res.sendStatus(500);
    }
    res.json(resp);
});

module.exports = router;