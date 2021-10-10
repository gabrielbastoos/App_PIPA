const UserRepo = require('../repo/userRepo');

//
exports.create =  async (req, res) => {
    let resp = await UserRepo.create(req.body);
    res.status(resp.status).json(resp);
};

//
exports.login = async (req, res) => {
    let resp = await UserRepo.findUser(req.body);
    res.status(resp.status).json(resp);
};

//
exports.getUser = async (req, res) => {
    const { id } = req.params;
    let resp = await UserRepo.findById(id);
    res.status(resp.status).json(resp);
};