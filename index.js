/*
**  Cobalt Core project
*/
'use strict';
const net = require('net');
const Cobalt = require('./src/cobalt');

const PORT = 4541

console.log('[COBALT-CORE] Starting server...');

const server = net.createServer((socket) => {
    let clients = new Clients();
    let cobalt = new Cobalt();
    cobalt.on('auth', (response) => {
        clients.add(response.to, socket);
        clients.get(response.to).write(JSON.stringify(response));
    });
    cobalt.on('response', (response) => {
        clients.get(response.to).write(JSON.stringify(response))
    });
    socket.on('data', (data) => {
        cobalt.parse(data)
    });
});

server.listen(PORT);

console.log('[COBALT-CORE] Running on port : ' + PORT);


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