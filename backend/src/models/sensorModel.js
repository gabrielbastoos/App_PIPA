const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/databaseConnection');

class SensorModel extends Model {}
SensorModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,  
    },
    s1: DataTypes.BOOLEAN,
    s2: DataTypes.BOOLEAN,
    s3: DataTypes.BOOLEAN,
    s4: DataTypes.BOOLEAN
},
{
    sequelize,
    modelName: 'SensorModel'
});

module.exports = SensorModel;