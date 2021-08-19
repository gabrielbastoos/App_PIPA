const express = require('express');
const app = express();
const router = express.Router();
//Rotas
const index = require('./routes/index');
const homeRoute = require('./routes/homeRoute');
app.use('/', index);
app.use('/home', homeRoute);
module.exports = app;
