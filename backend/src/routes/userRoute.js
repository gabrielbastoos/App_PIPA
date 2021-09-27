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

module.exports = router;