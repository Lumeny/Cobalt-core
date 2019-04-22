/*
**  Cobalt Core project
*/
'use strict';

const net = require('net');

const server = net.createServer((socket) => {
    socket.end('goodbye !');
})

server.listen(4541);