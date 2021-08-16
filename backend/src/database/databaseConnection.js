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

  //  const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5433/pipa', {
  //   dialect: 'postgres',
  //   protocol: 'postgres'
  //   });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = sequelize;