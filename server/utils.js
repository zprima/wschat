const namePool = [
  "mijagi",
  "ajami",
  "miyoto",
  "yamaha",
  "honda",
  "kawasaki",
  "suzuki",
  "sakura",
  "mijamoto",
  "yoshi"
];

module.exports = {
  generateRandomHex: function() {
    // 16777215 == ffffff
    const h = Math.floor(Math.random() * 16777215).toString(16);
    return `#${h}`;
  },

  generateRandomName: function() {
    const i = Math.floor(Math.random() * namePool.length);
    const n = Math.floor(Math.random() * 1000);

    return `${namePool[i]}${n}`;
  },

  handleReceivedMsg: function(message) {
    var parsedMessage = JSON.parse(message);
    var data = { ...parsedMessage };
    data["msgType"] = "msg";

    return JSON.stringify(data);
  }
};
