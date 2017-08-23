const net = require('net');

let socket = net.createConnection({port: 5000}, () => {
 console.log('Connected');
});

process.stdin.pipe(socket);

socket.on('data', data => {
  console.log(data.toString());
})

socket.on('close', () => {
  console.log('Disconnected')
})