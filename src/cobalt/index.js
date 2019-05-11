'use strict';
const EventEmitter = require('events');
const logger = require('../logger')();

/**
 * @class
 * @name Cobalt
 * @description Implementation of the cobalt protocol
 */
class Cobalt extends EventEmitter {}

/**
 * @method
 * @name parse
 * @param {Object} data
 */
Cobalt.prototype.parse = function(data) {
    data = dataToArrayOfJSON(data);
    for (let i = 0; i < data.length; i++) {
        this[data[i].action](data[i]);
    }
}

/**
 * @function
 * @name dataToArrayOfJSON
 * @param {*} data
 * @description If more than one messages are send in the same time, 
 * there will be a bug and the data will be like '{...}{...}' so we 
 * need to separe them.
 */
let dataToArrayOfJSON = function(data) {
    let array = [];
    data = data.toString().split('}');
    for (let i = 0; i < data.length; i++) {
        if (data[i] !== '') array.push(JSON.parse(data[i] + '}'));
    }
    return array;
}

/**
 * @method
 * @name auth
 * @param {Object} data
 * @description When the incoming data is a auth action
 */
Cobalt.prototype.auth = async function(data) {
    this.emit('auth', {'from':'server', 'to': data.from, 'action':'auth', 'content':'ok'});
}

/**
 * @method
 * @name ping
 * @param {Object} data
 * @description When the incoming data is a ping request
 */
Cobalt.prototype.ping = async function(data) {
    this.emit('response', {'from':'server', 'to': data.from, 'action':'ping', 'content':'pong'});
}

/**
 * @method
 * @name message
 * @param {Object} data
 * @description When the incoming data is a simple message
 */
Cobalt.prototype.message = async function(data) {
    //clients.get(data.to).write('Reponse')
}

/**
 * @method
 * @name checksum
 * @param {Object} data
 */
Cobalt.prototype.checksum = async function(data) {

}

module.exports = Cobalt;