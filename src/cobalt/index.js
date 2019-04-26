'use strict';
const EventEmitter = require('events');

class Cobalt extends EventEmitter {}

Cobalt.prototype.parse = function(data) {
    /*
    **  If 2 messages are send in the same time,
    **  there will be a bug and the string will be like
    **  {...}{...} so we need to separe them.
    */
    data = data.toString().split('}');
    for (let i = 0; i < data.length; i++) {
        if (data[i] !== '') this._parse(JSON.parse(data[i] + '}'));
    }
}

Cobalt.prototype._parse = function(data) {
    console.log(data)
    switch (data.action) {
        case 'auth':
            this.emit('auth', {'from':'server', 'to': data.from, 'action':'auth', 'content':'ok'});
            break;
        case 'ping':
            this.emit('response', {'from':'server', 'to': data.from, 'action':'ping', 'content':'pong'});
            break;
        case 'message':
            //clients.get(data.to).write('Reponse')
            break;
    }
}

Cobalt.prototype.checkIntegrity = function(data) {

}

module.exports = Cobalt;