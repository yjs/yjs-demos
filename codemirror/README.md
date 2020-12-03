# ProseMirror Demo
> [y-codemirror](https://docs.yjs.dev/ecosystem/editor-bindings/codemirror) / [y-websocket](https://docs.yjs.dev/ecosystem/connection-provider/y-websocket) / [Live Demo](https://demos.yjs.dev/codemirror/codemirror.html)

This is a demo of a [CodeMirror 5](https://codemirror.net/) editor that was made collaborative with Yjs & y-codemirror.

We use the [y-websocket](https://docs.yjs.dev/ecosystem/connection-provider) provider to share document updates through a server. There are many more providers available for Yjs - try switching to another provider. [See docs](https://docs.yjs.dev/ecosystem/connection-provider).

Also you could try addingh offline persistence to this demo. Wouldn't it be cool if document updates are persisted in the browser, so you can load your application load faster? Try it out: https://docs.yjs.dev/getting-started/allowing-offline-editing

## Quick Start

```sh
npm i
npm start
# Project is running at http://localhost:8080/
```
