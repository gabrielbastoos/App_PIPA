require('dotenv').config();
const { Sequelize } = require('sequelize');
const DatabaseSettings = require('./databaseSettings');
const URI_DATABASE = process.env.PIPA_CONNECTIONSTRING;

const sequelize = new Sequelize(URI_DATABASE, 
   {
       //host: DatabaseSettings.host,
       //port: DatabaseSettings.port,
       dialect: DatabaseSettings.dialect,
       dialectOptions: {
        ssl:  {
          require: true,
          rejectUnauthorized: false
      },
         useUTC:false, 
         timezone:"-03:00"
        },
       timezone:"-03:00",
       define: {
        freezeTableName: true
      }
   });
   
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully with Database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = sequelize;