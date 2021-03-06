const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/databaseConnection');
const Devices = require('./devices');

class Sensors extends Model {}
Sensors.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,  
    },
    sc1: DataTypes.BOOLEAN,
    sc2: DataTypes.BOOLEAN,
    scx1: DataTypes.BOOLEAN,
    scx2: DataTypes.BOOLEAN,
    volume: DataTypes.FLOAT,
    uuid_device: {
        type: DataTypes.STRING,
        references: {
            model: Devices,
            key: 'uuid'
        }
    }
},
{
    sequelize,
    modelName: 'Sensors'
});

module.exports = Sensors;