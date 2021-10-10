const Sensor = require('../models/sensors');
const Response = require('../shared/response-model');

class SensorRepo{
    static async findAll(uuid) {
        var response;
        let sensorList = [];
        await Sensor.findAll({ where:{uuid_device: uuid}})
        .then( (list) => {
            list.map( item => {
                sensorList.push(item.toJSON());
            });
            response = new Response(sensorList.toJSON(), false, null, 200);
        })
        .catch( error => {
            // ToDo Log the error to a file
            console.log(error);
            response = new Response(null, true, error, 500);
        });
        return response;
    }

    static async findLast(uuid) {
        var response;
        await Sensor.findOne({ limit: 1, order: [ [ 'createdAt', 'DESC' ]], where: { uuid_device: uuid } })
        .then( (sensor) => {
            if(sensor != null){
                response = new Response(sensor.toJSON(), false, null, 200);
            }
            else{
                response = new Response(null, true, "Sensor not found", 404);
            }
        })
        .catch( error => {
            // ToDo Log the error to a file
            console.log(error);
            response = new Response(null, true, error, 500);
        });
        return response;
    }

    static async create(Obj, uuid) {
        var response;
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
            response = new Response(value.toJSON(), false, null, 200);
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response = new Response(null, true, error, 500);;
        });
        return response;
    }
}

module.exports = SensorRepo;