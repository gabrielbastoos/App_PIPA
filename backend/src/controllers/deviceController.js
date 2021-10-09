const DeviceRepo = require('../repo/deviceRepo');

//Create new device
exports.post = async (req, res) => {
    let resp = await DeviceRepo.create(req.body);
    if (resp.hasError){
        res.sendStatus(500);
     }
     res.json(resp);
};

//Get one device by UUID (Pk)
exports.get = async (req, res) => {
    const { uuid } = req.params;
    let resp = await DeviceRepo.findByUuid(uuid);
    if (resp.hasError){
        res.sendStatus(500);
     }
     res.json(resp);
};
