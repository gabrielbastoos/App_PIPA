const express = require('express');
const router = express.Router();
const UserRepo = require('../repo/userRepo')

router.post('/login', async (req, res) => {
    let resp = await UserRepo.findUser(req.body);
    res.sendStatus(resp.data);
});

router.post('/createUser', async (req, res) => {
    let resp = await UserRepo.create(req.body);
    if (resp.hasError){
       res.sendStatus(500);
    }
    res.json(resp);
});

module.exports = router;