const SensorRepo = require('../repo/sensorRepo');

//Get last status from sensors
exports.getLast = async (req, res) => {
    const  { uuid } = req.params;
    let resp = await SensorRepo.findLast(uuid);
    if (resp.hasError){
       res.sendStatus(500);
    }
    res.json(resp);
};

//Get all status sensors from database
exports.getAll = async (req, res) => {
    const { uuid } = req.params;
    let resp = await SensorRepo.findAll(uuid);
    if (resp.hasError){
       res.sendStatus(500);
    }
    res.json(resp);
};