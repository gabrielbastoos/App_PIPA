const Device = require('../models/devices');
const Response = require('../shared/response-model');

class DeviceRepo{
    static async create(Obj) {
        var response;
        let deviceObj = Device.build({ 
            uuid: Obj.client,
            wifi: Obj.wifi_db,
            status: false 
        });
        await Device.create(deviceObj.dataValues)
        .then( (device) => {
            response = new Response(device.toJSON(), false, null, 200);
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response = new Response(null, true, error, 500);
        });
        return response;
    }

    static async update(Obj) {
        let response = new Response();
        let deviceObj = Device.build({ 
            uuid: Obj.client,
            wifi: Obj.wifi_db,
            status: true 
        });
        await Device.update({ wifi: deviceObj.dataValues.wifi, status: deviceObj.dataValues.status },
            {
                where: {
                    uuid: deviceObj.dataValues.uuid
                }
            })
        .then( (value) => {
            response.data = {
                updatedQuantity: value[0],
                updatedItemsList: value[1]
            }
            response.hasError = false;
            response.error = null;
            response.status = 200;
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response.data = null;
            response.hasError = true;
            response.error = error;
            response.status = 500;
        });
        return response;
    }

    static async findByUuid(uuid){
        var response;
        await Device.findByPk(uuid)
        .then( (device) => {
            response = new Response(device.toJSON(), false, null, 200);
        })
        .catch( (error) => {
            // ToDo: log the error to a file
            console.log(error);
            response = new Response(null, true, error, 500);
        });
        return response;
    }
}

module.exports = DeviceRepo;