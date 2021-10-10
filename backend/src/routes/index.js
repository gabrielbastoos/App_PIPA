const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res, next) {
    res.status(200).sendFile(path.join(__dirname, '../shared/indexPage.html'));
});
module.exports = router;