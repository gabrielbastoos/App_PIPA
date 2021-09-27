const Device = require('../models/devices');
const Response = require('../shared/response-model');

class DeviceRepo{
    static async create(Obj) {
        let response = new Response();
        let deviceObj = Device.build({ 
            uuid: Obj.client,
            wifi: Obj.wifi_db,
            status: false 
        });
        await Device.create(deviceObj.dataValues)
        .then( (value) => {
            response.data = value;
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

module.exports = DeviceRepo;