'use strict';
const net = require('net');
const socket = net.Socket();
require('dotenv').config();

socket.connect({ port: 3000, host: 'localhost' }, () => {
  console.log('TCP SERVER IS CONNECTED!!');
});

socket.on('data', (payload) => {
  let parsedData = JSON.parse(payload);
  console.log('is this driver payload', parsedData);
  if (parsedData.event === 'pickup') {
    setTimeout(() => {
      console.log('PICKED UP ORDER NUMBER', parsedData.payload.Id);
    }, 1000);
    socket.write(
      JSON.stringify({ event: 'in-transit', content: parsedData.Id })
    );
    setTimeout(() => {
      console.log('delivered order', parsedData.payload.Id);
      socket.write(
        JSON.stringify({ event: 'delivered', content: parsedData.payload.Id })
      );
    }, 3000);
  }
});
