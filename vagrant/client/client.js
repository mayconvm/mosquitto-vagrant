'use strict';

var client;

function conn(hostname, port, clientId) {
  // Create a client instance
  client = new Paho.MQTT.Client(hostname, Number(port), clientId);

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({onSuccess:onConnect});
}
// conectando
conn('192.168.33.10', 1884, "javascript-client");

function enviar() {
  var message = document.getElementById("message");
  console.log("Enviando messagem:", message.value);

  // seleciona o canal
  client.subscribe("/World");
  // nova instancia do objeto
  var message = new Paho.MQTT.Message(message.value);
  // campos extras
  message.destinationName = "/World";
  message.evento = "TEST-MAYCON";
  message.data = new Date();
  // envia a mensagem
  client.send(message); 
}



// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  var message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message); 
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.error("onMessageArrived:"+message.payloadString);
}