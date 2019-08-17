/*
**  Cobalt Core project
*/
'use strict';
const Server = require('./src/server');
const env = {
    'PORT' : 4541,
}

let server = new Server(env);
server.start();