const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeController');
const SensorRepo = require('../repo/sensorRepo');

router.get('/', async (req, res) => {
    let resp = await SensorRepo.findLast();
    if (resp.hasError){
       res.sendStatus(500);
    }
    res.json(resp);
});
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
module.exports = router;