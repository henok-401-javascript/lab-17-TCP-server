'use strict';
const net = require('net');
const server = net.createServer();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const socketPool = [];

server.listen(PORT, () => {
  console.log('server is up at', PORT);
});

server.on('connection', (socket) => {
  socketPool.push(socket);
  console.log('proof of connection', socket.address());
  socket.on('data', (payload) => {
    console.log(JSON.parse(payload));
    let parsedJson = JSON.parse(payload);
    if (parsedJson.event && parsedJson.payload) {
      for (let i = 0; i < socketPool.length; i++) {
        socketPool[i].write(payload);
      }
    }
    if (parsedJson.event === 'in-transit') {
      console.log('in-transit order', parsedJson.content);
    }
    if (parsedJson.event === 'delivered') {
      console.log('delivered order', parsedJson.content);
    }
  });
});
