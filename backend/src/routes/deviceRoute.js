const express = require('express');
const router = express.Router();
const DeviceRepo = require('../repo/deviceRepo')

router.post('/create', async (req, res) => {
    let resp = await DeviceRepo.create(req.body);
    if (resp.hasError){
        res.sendStatus(500);
     }
     res.json(resp);
});

router.get('/status/:uuid', async (req, res) => {
    const { uuid } = req.params;
    let resp = await DeviceRepo.findByUuid(uuid);
    if (resp.hasError){
        res.sendStatus(500);
     }
     res.json(resp);
});

module.exports = router;
