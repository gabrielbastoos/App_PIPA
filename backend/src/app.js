const express = require('express');
const sequelize = require('./database/databaseConnection');
const hcsr04 = require('./models/hcsr04');
const subscriber = require('./mqtt/orchestratorSubscriber')
const publisher = require('./mqtt/publisher')

const router = express.Router();
const index = require('./routes/index');
const homeRoute = require('./routes/homeRoute');

module.exports = () => {
    const app = express();
  
    app.use(express.json());
  
    app.use('/', index);
    app.use('/home', homeRoute);

    sequelize
      .sync()
      .then( () => {
        console.log('Syncing with the database successful.')
      })
      .catch( error => {
        console.log(error);
      });
      
    return app;
  };

