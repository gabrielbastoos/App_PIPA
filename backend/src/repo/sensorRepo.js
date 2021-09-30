const Sensor = require('../models/sensors');
const Response = require('../shared/response-model');

class SensorRepo{
    static async findAll(uuid) {
        let response = new Response();
        let sensorList = [];
        await Sensor.findAll({ where:{uuid_device: uuid}})
        .then( (list) => {
            list.map( item => {
                sensorList.push(item.toJSON());
            });
            response.data = sensorList;
            response.hasError = false;
            response.error = null;
        })
        .catch( error => {
            // ToDo Log the error to a file
            console.log(error);
            response.data = null;
            response.hasError = true;
            response.error = error;
        });
        return response;
    }

    static async findLast(uuid) {
        let response = new Response();
        await Sensor.findOne({ limit: 1, order: [ [ 'createdAt', 'DESC' ]], where: { uuid_device: uuid } })
        .then( (value) => {
            response.data = value;
            response.hasError = false;
            response.error = null;
        })
        .catch( error => {
            // ToDo Log the error to a file
            console.log(error);
            response.data = null;
            response.hasError = true;
            response.error = error;
        });
        return response;
    }

    static async create(Obj, uuid) {
        let response = new Response();
        let objSensor = Sensor.build({
            sc1: Obj.sensors.sc1,
            sc2: Obj.sensors.sc2,
            scx1: Obj.sensors.scx1,
            scx2: Obj.sensors.scx2,
            volume: Obj.sensors.volume,
            uuid_device: uuid
        });
        await Sensor.create(objSensor.dataValues)
        .then( (value) => {
            response.data = value.toJSON();
            response.hasError = false;
            response.error = null;
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response.data = null;
            response.hasError = true;
            response.error = error;
        });
        return response;
    }
}

module.exports = SensorRepo;