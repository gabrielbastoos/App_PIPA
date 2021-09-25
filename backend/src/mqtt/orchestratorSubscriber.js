const SensorRepo = require('../repo/sensorRepo');
const connection = require('./connection');
const DeviceRepo = require('../repo/deviceRepo');

//initialize the MQTT client
var client = connection;

// subscribe to topic 'NODEMCU_PIPA'
client.subscribe(['NODEJS_PIPA','STATUS_PIPA']);

client.on('message', function (topic, message) {
    //Called each time a message is received
    let obj = JSON.parse(message.toString());
    console.log('Received message:', topic, obj);
    if (topic == 'NODEJS_PIPA'){
        DeviceRepo.update(obj);
        SensorRepo.create(obj, obj.client);
    }
    else if(topic == 'STATUS_PIPA'){
        DeviceRepo.update(obj);
    }
});
