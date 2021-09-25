const express = require('express');
const router = express.Router();
const UserRepo = require('../repo/userRepo')

router.post('/createUser', async (req, res) => {
    let resp = await UserRepo.create(req.body);
    if (resp.hasError){
       res.sendStatus(500);
    }
    res.json(resp);
});

module.exports = router;