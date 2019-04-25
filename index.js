/*
**  Cobalt Core project
*/
'use strict';
const net = require('net');
const Cobalt = require('./src/cobalt');

const server = net.createServer((socket) => {
    let cobalt = new Cobalt(socket);
    socket.on('data', (data) => {cobalt.parse(data)});
});

server.listen(4541);


/*
class Clients {
    constructor () {
    this.clients = {}
    }
}

Clients.prototype.add = function (sender, socket) {
    this.clients[sender] = socket
}

Clients.prototype.get = function (addr) {
    return this.clients[addr]
}
*/