const net = require('net');
let people = {};  
let sockets = [];
let socketId = 0;

let server = net.createServer(socket => {
  socketId++;
  socket.name = "Guest" + socketId;
  sockets.push(socket);

  socket.write(`Welcome ${socket.name}!\n`);
  broadcast(`${socket.name} has joined the server!`);

  socket.on('data', data =>{
    broadcast(`${socket.name}: ${data}`, socket);
  });

  socket.on('close', ()=>{
    sockets.splice(sockets.indexOf(socket), 1);
    broadcast(`${socket.name} has disconnected!`);
    
  })
}).listen(5000);

function broadcast(message, sender){
  sockets.forEach(socket => {
    if(socket !== sender){
      socket.write(`${message}`);
    }
  });
  console.log(message);
}
