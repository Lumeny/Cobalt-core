const assert = require('assert');
const net = require('net');

const protocol = {
    'sendServerPing' : {
        'action' : 'ping',
        'to' : 'server',
        'from' : 'test'
    },
    'authentificate' : {
        'action':'auth',
        'from':'test',
        'to':'server'
    }
}

describe('Connexion', function() {
    it('Should authentificate', function(done) {
        let client = net.createConnection({port:4541}, () => {
            client.write(JSON.stringify(protocol.authentificate));
        });
        client.on('data', (data) =>  {
            client.end();
            if (JSON.parse(data.toString()).content !== 'ok') done(false);
            done();
        });
    });

    it('Should return pong', function(done) {
        let client = net.createConnection({port:4541}, () => {
            client.write(JSON.stringify(protocol.authentificate));
            client.write(JSON.stringify(protocol.sendServerPing));
        });
        client.on('data', (data) =>  {
            data = JSON.parse(data.toString());
            if (data.action === 'auth') return;
            if (data.content === 'pong') {
                client.end();
                done();
            } else {
                done(false);
            }
        });
    });
});
