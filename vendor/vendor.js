'use strict';
const net = require('net');
const socket = net.Socket();
require('dotenv').config();
let faker = require('faker');

socket.connect({ port: 3000, host: 'localhost' }, () => {
  console.log('TCP SERVER IS CONNECTED!!');
});

setInterval(() => {
  let Store = faker.company.companyName();
  let Id = faker.random.number();
  let CustomerName = faker.name.firstName() + ' ' + faker.name.lastName();
  let Address =
    faker.address.streetAddress() +
    ' ' +
    faker.address.city() +
    ' ' +
    faker.address.state() +
    ' ' +
    faker.address.zipCode();

  // console.log({ Store, Id, CustomerName, Address });
  socket.write(
    JSON.stringify({
      event: 'pickup',
      payload: { content: Store, Id, CustomerName, Address },
    })
  );
}, 2000);

socket.on('delivered', (payload) => {
  console.log('Thank you for delivering order ', payload.Id);
});
