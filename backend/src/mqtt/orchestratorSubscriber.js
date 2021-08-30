const SensorRepo = require('../repo/sensorRepo');
const connection = require('./connection');

//initialize the MQTT client
var client = connection;

// subscribe to topic 'NODEMCU_PIPA'
client.subscribe('NODEJS_PIPA');

client.on('message', function (topic, message) {
    //Called each time a message is received
    let obj = JSON.parse(message.toString());
    console.log('Received message:', topic, obj);
    console.log(SensorRepo.create(obj));
});
