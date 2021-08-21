const { Sequelize } = require('sequelize');

const DatabaseSettings = require('./databaseSettings');

const sequelize = new Sequelize(
   DatabaseSettings.name,
   DatabaseSettings.user,
   DatabaseSettings.password, 
   {
       host: DatabaseSettings.host,
       port: DatabaseSettings.port,
       dialect: DatabaseSettings.dialect,
       define: {
        freezeTableName: true
      }
   });
   
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = sequelize;