require('dotenv').config();
const { Sequelize } = require('sequelize');
const DatabaseSettings = require('./databaseSettings');
const URI_DATABASE = process.env.DATABASE_URL;

// const sequelize = new Sequelize(URI_DATABASE, 
//    {
//        dialect: DatabaseSettings.dialect,
//        dialectOptions: {
//         ssl:  {
//           require: true,
//           rejectUnauthorized: false
//       },
//          useUTC:false, 
//          timezone:"-03:00"
//         },
//        timezone:"-03:00",
//        define: {
//         freezeTableName: true
//       }
//    });

  const sequelize = new Sequelize(
    DatabaseSettings.name,
    DatabaseSettings.user,
    DatabaseSettings.password, 
    {
        host: DatabaseSettings.host,
        port: DatabaseSettings.port,
        dialect: DatabaseSettings.dialect,
        dialectOptions: {
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