const SensorRepo = require('../repo/sensorRepo');

//Get last status from sensors
exports.getLast = async (req, res) => {
    const  { uuid } = req.params;
    let resp = await SensorRepo.findLast(uuid);
    res.status(resp.status).json(resp);
};

//Get all status sensors from database
exports.getAll = async (req, res) => {
    const { uuid } = req.params;
    let resp = await SensorRepo.findAll(uuid);
    res.status(resp.status).json(resp);
};