const mqtt = require('mqtt');

function connection(){
var options = {
    host: '68ade6ffee994d2dbeb23226441e2d6c.s1.eu.hivemq.cloud',
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