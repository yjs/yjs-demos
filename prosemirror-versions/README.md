# ProseMirror + Versions Demo
> [y-prosemirror](https://docs.yjs.dev/ecosystem/editor-bindings/prosemirror) / [y-websocket](https://docs.yjs.dev/ecosystem/connection-provider/y-websocket) / [Live Demo](https://demos.yjs.dev/prosemirror-versions/prosemirror-versions.html)

This is a demo of a [ProseMirror](https://prosemirror.net/) editor that was made collaborative with Yjs & y-prosemirror. This demo uses the [prosemirror-example-setup](https://github.com/ProseMirror/prosemirror-example-setup) as a configuration. Learn more about how you can build your own custom editor with ProseMirror in [their documentation](https://github.com/yjs/y-prosemirror/).

In this variation of the ProseMirror demo, we allow you to create versions and render the differences and highlight the changes by a unique user-color. When you enable "Live Tracking", your editor becomes unresponsive and you can see diff created from edits from other users happening in real-time. Click on a created snapshot to render the differences to the previous snapshot.

The snapshot API is very versatile and allows you to render the differences between any two snapshots. In this examples, we simply created a linear version history. But using the same API you can model branching & merging as well.

## Quick Start

```sh
npm i
npm start
# Project is running at http://localhost:8080/
```
