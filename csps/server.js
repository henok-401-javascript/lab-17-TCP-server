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
  console.log('what does socket have', socket.address());
  socket.on('data', (payload) => {
    console.log('driver request', JSON.parse(payload));
    if (JSON.parse(payload).event && JSON.parse(payload).payload) {
      for (let i = 0; i < socketPool.length; i++) {
        socketPool[i].write(payload);
      }
    }
  });
});
