
/**
 * @type {any}
 */
const WebSocket = require('ws')
const http = require('http')
const StaticServer = require('node-static').Server
const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection

const production = process.env.PRODUCTION != null
const port = process.env.PORT || 8080

const staticServer = new StaticServer('../', { cache: production ? 3600 : false, gzip: production })

const server = http.createServer((request, response) => {
  request.addListener('end', () => {
    staticServer.serve(request, response)
  }).resume()
})
const wss = new WebSocket.Server({ server })

wss.on('connection', (conn, req) => setupWSConnection(conn, req, { gc: req.url.slice(1) !== 'prosemirror-versions' }))

server.listen(port)

console.log(`Listening to http://localhost:${port} ${production ? '(production)' : ''}`)
