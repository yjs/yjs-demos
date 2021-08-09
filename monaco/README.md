# Monaco Demo
> [y-monaco](https://docs.yjs.dev/ecosystem/editor-bindings/monaco) / [y-websocket](https://docs.yjs.dev/ecosystem/connection-provider/y-websocket) / [Live Demo](https://demos.yjs.dev/monaco/monaco.html)

This is a demo of a [Monaco](https://microsoft.github.io/monaco-editor/) editor that was made collaborative with Yjs & `y-monaco`.

We use the [y-websocket](https://docs.yjs.dev/ecosystem/connection-provider/y-websocket) provider to share document updates through a server. There are many more providers available for Yjs - try switching to another provider. [See docs](https://docs.yjs.dev/ecosystem/connection-provider).

Also you could try adding offline persistence to this demo. Wouldn't it be cool if document updates were persisted in the browser so you could load your application load faster? Try it out: https://docs.yjs.dev/getting-started/allowing-offline-editing

## Quick Start

```sh
npm i
npm start
# Project is running at http://localhost:8080/
```
