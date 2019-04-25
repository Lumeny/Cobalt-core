'use strict';

class Cobalt {
    constructor(socket) {
        this._from = socket;
    }
}

Cobalt.prototype.parse = function(data) {
    data = JSON.parse(data.toString());
    switch (data.action) {
        case 'auth':
            /*if (data.sender !== null) {
            clients.add(data.sender, socket)
            }*/
            break;
        case 'ping':
            this._from.write('pong');
            break;
        case 'message':
            //clients.get(data.to).write('Reponse')
            break;
    }
}

module.exports = Cobalt;