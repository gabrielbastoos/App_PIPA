const connection = require('./connection');

//initialize the MQTT client
var client = connection;

//publish message 'Hello' to topic 'NODEMCU_PIPA'
setInterval(function(){
    client.publish('NODEMCU_PIPA', 'pipa_001');
}, 10000);

// const pub = {
//     publish(){
//         client.publish('NODEMCU_PIPA', 'L');
//         console.log("Aqui----------------------------");
//     }
// }

// module.exports = pub;
