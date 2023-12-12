
/**
 * @type {any}
 */
const WebSocket = require('ws')
const http = require('http')
const StaticServer = require('node-static').Server
const ywsUtils = require('y-websocket/bin/utils')
const setupWSConnection = ywsUtils.setupWSConnection
const docs = ywsUtils.docs
const env = require('lib0/environment')
const nostatic = env.hasParam('--nostatic')

const production = process.env.PRODUCTION != null
const port = process.env.PORT || 3000

const staticServer = nostatic ? null : new StaticServer('../', { cache: production ? 3600 : false, gzip: production })

const server = http.createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({
      response: 'ok'
    }))
    return
  }

  if (staticServer && !(request.url || '').startsWith('/ws/')) {
    request.addListener('end', () => {
      staticServer.serve(request, response)
    }).resume()
  }
})
const wss = new WebSocket.Server({ server })

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req, { gc: req.url.slice(1) !== 'ws/prosemirror-versions' })
})

// log some stats
setInterval(() => {
  let conns = 0
  docs.forEach(doc => { conns += doc.conns.size })
  const stats = {
    conns,
    docs: docs.size,
    websocket: `ws://localhost:${port}`,
    http: `http://localhost:${port}`
  }
  console.log(`${new Date().toISOString()} Stats: ${JSON.stringify(stats)}`)
}, 10000)

server.listen(port, '0.0.0.0')

console.log(`Listening to http://localhost:${port} (${production ? 'production + ' : ''} ${nostatic ? 'no static content' : 'serving static content'})`)
