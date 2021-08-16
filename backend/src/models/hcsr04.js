const { Model, DataTypes } = require('sequelize');
const sequelize = require('../databaseConfig/databaseConnection');

class HcSr04 extends Model {}
HcSr04.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,  
    },
    distanceOfTop: DataTypes.FLOAT,
    dateTime: DataTypes.DATE
},
{
    sequelize,
    modelName: 'HcSr04'
});

module.exports = HcSr04;