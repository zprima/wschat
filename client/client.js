/* eslint-disable no-console */
const WebSocket = require("ws");
const readline = require("readline");
const chalk = require("chalk");

const url = "ws://localhost:8080";
const ws = new WebSocket(url);

var clientName = "Unknown";
var clientColor = "#fff";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

ws.on("open", function open() {
  console.log("connected");
});

ws.on("close", function close() {
  console.log("disconnected");
  process.exit(1);
});

ws.on("message", function incoming(message) {
  var data = JSON.parse(message);

  if (data.msgType == "init") {
    clientName = data.name;
    clientColor = data.color;
    console.log(`Server: ${data.msg}`);
  } else {
    const colorify = chalk.hex(data.color);
    console.log(colorify(`${data.name}: ${data.msg}`));
  }
});

function sendMessage(text) {
  var data = {
    name: clientName,
    color: clientColor,
    msg: text
  };
  ws.send(JSON.stringify(data));
}

const main = async () => {
  try {
    rl.on("line", text => {
      sendMessage(text);
    });
  } catch (err) {
    console.log(`Failed with ${err}`);
    process.exit(1);
  }
};
main();
