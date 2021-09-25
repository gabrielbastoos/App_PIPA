const express = require('express');
const sequelize = require('./database/databaseConnection');
const subscriber = require('./mqtt/orchestratorSubscriber');
const publisher = require('./mqtt/publisher');

const router = express.Router();
const index = require('./routes/index');
const statusRoute = require('./routes/statusRoute');
const userRoute = require('./routes/userRoute');

module.exports = () => {
    const app = express();
  
    app.use(express.json());
  
    app.use('/', index);
    app.use('/status', statusRoute);
    app.use('/user', userRoute);

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

