const express = require('express');
const sequelize = require('./databaseConfig/databaseConnection');

module.exports = () => {
    const app = express();
  
    app.use(express.json());
  
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
//const app = express();
// const router = express.Router();
// //Rotas
// const index = require('./routes/index');
// const homeRoute = require('./routes/homeRoute');
// app.use('/', index);
// app.use('/home', homeRoute);
// module.exports = app;
