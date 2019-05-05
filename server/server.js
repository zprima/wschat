/* eslint-disable no-console */
const utils = require("./utils.js");
const xclient = require("./client.js");

const WebSocket = require("ws");
const chalk = require("chalk");
const wss = new WebSocket.Server({ port: 8080, clientTracking: true });

function clientConnected(client) {
  var colorify = chalk.hex(client.color);
  console.log(`a client connected (${colorify(client.name)})`);
}

function sendInitMsg(ws, client) {
  ws.send(
    JSON.stringify({
      name: client.name,
      color: client.color,
      msg: `Welcome, ${client.name}`,
      msgType: "init"
    })
  );
}

function broadcastAll(data) {
  // Broadcast to all
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on("listening", () => {
  console.log(chalk.green("Server listening"));
});

wss.on("connection", function connection(ws) {
  var client = new xclient.Client();
  clientConnected(client);
  sendInitMsg(ws, client);

  ws.on("message", function incoming(message) {
    var json_data = utils.handleReceivedMsg(message);
    broadcastAll(json_data);
  });
});
