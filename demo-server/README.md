# demo-server

All yjs-demos connect to this server to exchange document updates. It combines the y-websocket server with an http server for the files in the root directory. Of course, you can choose any of the Yjs providers instead. This is just a demo server.

```sh
npm install
npm run build-all # Iterates through all demos and builds them.
npm start
```

