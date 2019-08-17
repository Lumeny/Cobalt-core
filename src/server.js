'use strict';
const net = require('net');
const logger = require('logger')();

const Clients = require('./clients');

const cobalt = require('./cobalt');

class Server {
    constructor(env) {
        this.PORT = env.PORT || '4541';
        this.NAME = env.NAME || '[COBALT-CORE]';

        this.srv = null;
    }
}

Server.prototype._init = async function() {
    this.srv = net.createServer((socket) => {
        cobalt.setEventsSocket(socket);
        socket.on('data', (data) => {
            cobalt.parse(data);
        });
    });
};

Server.prototype.start = async function() {
    logger.info('Starting server...');
    await this._init();
    this.srv.listen(this.PORT);
    logger.info('Running on port ' + this.PORT);
};

module.exports = Server;
