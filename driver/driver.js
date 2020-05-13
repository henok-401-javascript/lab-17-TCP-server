'use strict';
const net = require('net');
const socket = net.Socket();
require('dotenv').config();

socket.connect({ port: 3000, host: 'localhost' }, () => {
  console.log('TCP SERVER IS CONNECTED!!');
});

socket.on('data', (payload) => {
  let parsedData = JSON.parse(payload.toString());

  if (parsedData.event === 'pickup') {
    console.log('PICKED UP ORDER NUMBER', parsedData.payload.Id);

    setTimeout(() => {
      let newTransit = { event: 'in-transit', content: parsedData.payload.Id };
      socket.write(JSON.stringify(newTransit));
    }, 1000);
  }
  if (parsedData.event === 'in-transit') {
    setTimeout(() => {
      let newData = { event: 'delivered', content: parsedData.content };
      console.log('delivered order', parsedData.payload.Id);
      socket.write(JSON.stringify(newData));
    }, 3000);
  }
});
