const express = require('express');
const sequelize = require('./database/databaseConnection');
const subscriber = require('./mqtt/orchestratorSubscriber');
const publisher = require('./mqtt/publisher');

const router = express.Router();
const index = require('./routes/index');
const sensorRoute = require('./routes/sensorRoute');
const userRoute = require('./routes/userRoute');
const deviceRoute = require('./routes/deviceRoute');

module.exports = () => {
    const app = express();
  
    app.use(express.json());
  
    app.use('/', index);
    app.use('/sensor', sensorRoute);
    app.use('/user', userRoute);
    app.use('/device', deviceRoute);

    sequelize
      .sync()
      .then( () => {
        console.log('Syncing with the database successful.');
        console.log('-------------------------------Begin-------------------------------');
      })
      .catch( error => {
        console.log(error);
      });
      
    return app;
  };

