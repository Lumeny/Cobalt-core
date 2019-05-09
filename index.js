/*
**  Cobalt Core project
*/
'use strict';
const Server = require('./src/server');
const env = {
    'PORT' : 4541,
}

const server = new Server(env);
server.start();