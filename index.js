/*
**  Cobalt Core project
*/
'use strict'

const net = require('net')

const server = net.createServer((socket) => {
  let clients = new Clients()

  socket.on('data', (data) => {
    data = JSON.parse(data.toString(this.utf8))
    if (data.action === 'auth' && data.sender !== null) {
      clients.add(data.sender, socket)
    } else if (data.action === 'message') {
      clients.get(data.to).write('Reponse')
    }
  })
})

server.on('connection', (connection) => {
  console.log(connection)
})

server.listen(4541)

class Clients {
  constructor () {
    this.clients = {}
  }
}

Clients.prototype.add = function (sender, socket) {
  this.clients[sender] = socket
}

Clients.prototype.get = function (addr) {
  return this.clients[addr]
}