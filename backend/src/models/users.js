const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/databaseConnection');
const Devices = require('./devices');

class Users extends Model {}
Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,  
    },
    name: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    uuid: {
        type: DataTypes.STRING,
        references: {
            model: Devices,
            key: 'uuid'
        }
    },
    admin: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
},
{
    sequelize,
    modelName: 'Users'
});

module.exports = Users;