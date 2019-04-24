const assert = require('assert');
const net = require('net');

const protocol = {
    'sendPing' : {
        'action' : 'ping'
    }
}

describe('Connexion', function() {
    it('Should return pong', function(done) {
        const client = net.createConnection({port:4541}, () => {
            client.write(JSON.stringify(protocol.sendPing));
        });
        client.on('data', (data) =>  {
            if (data.toString() !== 'pong') done(false);
            done();
        });
    });
});
