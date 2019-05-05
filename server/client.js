const utils = require("./utils.js");

class Client {
  constructor() {
    this.name = utils.generateRandomName();
    this.color = utils.generateRandomHex();
  }
}

module.exports = {
  Client
};
