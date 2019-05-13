'use strict';
const net = require('net');
const Cobalt = require('../cobalt');
const logger = require('logger')();

class Server {
    constructor(env) {
        this.PORT = env.PORT || '4541';
        this.NAME = env.NAME || '[COBALT-CORE]';

        this.srv = null;
    }
}

Server.prototype._init = async function() {
    this.srv = net.createServer((socket) => {
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
}

Server.prototype.start = async function() {
    logger.info(this.NAME + ' Starting server...');
    await this._init();
    this.srv.listen(this.PORT);
    logger.info(this.NAME + ' Running on port : ' + this.PORT);
}

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

module.exports = Server;
