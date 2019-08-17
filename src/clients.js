'use strict';

class Clients {
    constructor () {
        this.clients = {};
    }
}

Clients.prototype.add = function (sender, socket) {
    this.clients[sender] = socket;
};

Clients.prototype.get = function (addr) {
    return this.clients[addr];
};

var instance = null;
var getShared = function() {
    if(instance === null){
        instance = new Clients();
    }
    return instance;
};

module.exports = getShared();