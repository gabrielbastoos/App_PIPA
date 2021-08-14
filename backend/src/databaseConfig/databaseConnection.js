const { Sequelize } = require('sequelize');

const DatabaseSettings = require('./databaseSettings');

//Connects to the database, uses a connection pool internally
const sequelize = new Sequelize(
   DatabaseSettings.name,
   DatabaseSettings.user,
   DatabaseSettings.password, 
   {
       host: DatabaseSettings.host,
       port: DatabaseSettings.port,
       dialect: DatabaseSettings.dialect
   })