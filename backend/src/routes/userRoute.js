const express = require('express');
const router = express.Router();
const UserRepo = require('../repo/userRepo')

router.post('/createUser', async (req, res) => {
    let resp = await UserRepo.create(req.body);
    if (resp.status == 500){
       res.sendStatus(resp.status);
    }
    res.status(resp.status).json(resp);
});

router.post('/login', async (req, res) => {
    let resp = await UserRepo.findUser(req.body);
    if (resp.status == 500){
        res.sendStatus(resp.status);
     }
     res.status(resp.status).json(resp);
});

router.get('/status/:id', async (req, res) => {
    const { id } = req.params;
    let resp = await UserRepo.findById(id);
    if (resp.hasError){
       res.sendStatus(500);
    }
    res.json(resp);
});
module.exports = router;