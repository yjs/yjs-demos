# TipTap Demo
> [y-prosemirror](https://docs.yjs.dev/ecosystem/editor-bindings/prosemirror) / [y-websocket](https://docs.yjs.dev/ecosystem/connection-provider/y-websocket) / [Live Demo](https://demos.yjs.dev/tiptap/tiptap.html)

This is a demo of an [TipTap](https://tiptap.dev/) editor that was made collaborative with Yjs & y-prosemirror. Since TipTap is based on ProseMirror, we simply need to add y-prosemirror to the internal ProseMirror instance. Find out more about the prosemirror binding in our [Official Docs](https://docs.yjs.dev/ecosystem/editor-bindings/prosemirror).


We use the [y-websocket](https://docs.yjs.dev/ecosystem/connection-provider/y-websocket) provider to share document updates through a server. There are many more providers available for Yjs - try switching to another provider. [See docs](https://docs.yjs.dev/ecosystem/connection-provider).

Also you could try addingh offline persistence to this demo. Wouldn't it be cool if document updates are persisted in the browser, so you can load your application load faster? Try it out: https://docs.yjs.dev/getting-started/allowing-offline-editing

## Quick Start

```sh
npm i
npm start
# Project is running at http://localhost:8080/
```
