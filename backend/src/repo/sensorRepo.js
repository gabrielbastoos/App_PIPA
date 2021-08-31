const Sensor = require('../models/sensors');
const Response = require('../shared/response-model');

class SensorRepo{
    static async findLast() {
        let response = new Response();
        await Sensor.findOne({ limit: 1, order: [ [ 'createdAt', 'DESC' ]] })
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

    static async create(sensorObj) {
        let response = new Response();
        await Sensor.create(sensorObj)
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