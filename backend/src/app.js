const express = require('express');
const sequelize = require('./database/databaseConnection');
const subscriber = require('./mqtt/orchestratorSubscriber');
const publisher = require('./mqtt/publisher');

const router = express.Router();
const index = require('./routes/index');
const statusRoute = require('./routes/statusRoute');
const userRoute = require('./routes/userRoute');
const deviceRoute = require('./routes/deviceRoute');

module.exports = () => {
    const app = express();
  
    app.use(express.json());
  
    app.use('/', index);
    app.use('/status', statusRoute);
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

