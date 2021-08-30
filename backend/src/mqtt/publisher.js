const connection = require('./connection');

//initialize the MQTT client
var client = connection;

// publish message 'Hello' to topic 'NODEMCU_PIPA'
setInterval(function(){
    client.publish('NODEMCU_PIPA', 'L');
}, 5000);