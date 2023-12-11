
/**
 * @type {any}
 */
const WebSocket = require('ws')
const http = require('http')
const StaticServer = require('node-static').Server
const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection

const production = process.env.PRODUCTION != null
const port = process.env.PORT || 3000

const staticServer = new StaticServer('../', { cache: production ? 3600 : false, gzip: production })

const server = http.createServer((request, response) => {
  if (!(request.url || '').startsWith('/ws/')) {
    request.addListener('end', () => {
      staticServer.serve(request, response)
    }).resume()
  }
})
const wss = new WebSocket.Server({ server })

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req, { gc: req.url.slice(1) !== 'ws/prosemirror-versions' })
})

server.listen(port, '0.0.0.0')

console.log(`Listening to http://localhost:${port} ${production ? '(production)' : ''}`)
