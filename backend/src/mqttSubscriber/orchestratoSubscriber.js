const mqtt = require('mqtt');
const SensorRepo = require('../repo/sensorRepo');

var options = {
    host: 'd0b5f4bcb08a43189a9bd4e2bef485db.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'pipauser',
    password: 'P1p4_mqtt'
}

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

client.on('message', function (topic, message) {
    //Called each time a message is received
    console.log('Received message:', topic, message.toString());
    let obj = JSON.parse(message.toString());
    console.log('aqui:',obj);
    console.log(SensorRepo.create(obj));
});

// // publish message 'Hello' to topic 'my/test/topic'
// client.publish('my/test/topic', 'Hello');