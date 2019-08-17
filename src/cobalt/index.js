'use strict';
const logger = require('logger')();

const bus = require('./bus');
const protocol = require('./protocol');
const clients = require('../clients');

var cobalt = {};

/**
 * @function
 * @name setEventsSocket
 * @param {socket} socket
 */
cobalt.setEventsSocket = async function(socket) {
    bus.on(protocol.ACTION.AUTHENTIFCATION, (response) => {
        clients.add(response.to, socket);
        clients.get(response.to).write(JSON.stringify(response));
    });
    bus.on(protocol.ACTION.RESPONSE, (response) => {
        clients.get(response.to).write(JSON.stringify(response));
    });
};

/**
 * @function
 * @name parse
 * @param {Object} data
 */
cobalt.parse = async function(data) {
    // If more than one messages are send in the same time, 
    // there will be a bug and the data will be like '{...}{...}' so we 
    // need to separe them.
    let array = [];
    data = data.toString().split('}');
    for (let i = 0; i < data.length; i++) {
        if (data[i] !== '') array.push(JSON.parse(data[i] + '}'));
    }
    // debug to see the data
    logger.debug(array);
    //  Actions regarding the data
    for (let i = 0; i < array.length; i++) {
        if (!array[i].action) continue;
        switch (array[i].action) {
        case protocol.ACTION.AUTHENTIFCATION:
            cobalt.auth(array[i]);
            break;
        case protocol.ACTION.PING:
            cobalt.ping(array[i]);
            break;
        case protocol.ACTION.MESSAGE:
            cobalt.message(array[i]);
            break;
        }
    }
};

/**
 * @function
 * @name auth
 * @param {Object} data
 * @description When the incoming data is a auth action
 */
cobalt.auth = async function(data) {
    bus.emit(protocol.ACTION.AUTHENTIFCATION, {'from':'server', 'to': data.from, 'action':'auth', 'content':'ok'});
};

/**
 * @function
 * @name ping
 * @param {Object} data
 * @description When the incoming data is a ping request
 */
cobalt.ping = async function(data) {
    bus.emit(protocol.ACTION.RESPONSE, {'from':'server', 'to': data.from, 'action':'ping', 'content':'pong'});
};

/**
 * @method
 * @name message
 * @param {Object} data
 * @description When the incoming data is a simple message
 */
cobalt.message = async function(/*data*/) {
    //clients.get(data.to).write('Reponse')
};

/**
 * @method
 * @name checksum
 * @param {Object} data
 */
cobalt.checksum = async function(/*data*/) {

};

module.exports = cobalt;