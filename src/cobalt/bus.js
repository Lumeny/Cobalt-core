'use strict';

const logger = require('logger')();

class Bus {
    constructor() {
        this.eventArray = [];
    }
}

Bus.prototype.eventList = function() {
    logger.debug(this.eventArray);
};

Bus.prototype.on = function(eventName, eventCallback) {
    this.eventArray[eventName] = eventCallback;
};

Bus.prototype.emit = function(eventName, eventObject) {
    this.eventArray[eventName](eventObject);
};


var instance = null;
var getShared = function() {
    if(instance === null){
        instance = new Bus();
    }
    return instance;
};

module.exports = getShared();