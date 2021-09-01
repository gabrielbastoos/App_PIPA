const mqtt = require('mqtt');

function connection(){
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
    console.log('Connected to the broker');
});

client.on('error', function (error) {
    console.log(error);
});

return client;
}

module.exports = connection();