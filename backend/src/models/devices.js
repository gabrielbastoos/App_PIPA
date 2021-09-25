const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/databaseConnection');

class Devices extends Model {}
Devices.init({
    uuid: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,  
    },
    wifi: DataTypes.STRING,
    status: DataTypes.BOOLEAN
},
{
    sequelize,
    modelName: 'Devices'
});

module.exports = Devices;