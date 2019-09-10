import logger from '../logger/index';
import WebSocket from 'ws';

class Socket {
    private wss : WebSocket.Server;

    constructor() {
        this.wss = new WebSocket.Server({port: 8080});
    }

    listen() {
        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => { this.onMessage(message); });
        });
    }

    private onMessage(message : WebSocket.Data) {
        logger.log('Got message : ' + message.toString(), 'Socket');
    }
}