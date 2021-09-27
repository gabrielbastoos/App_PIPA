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

module.exports = router;
