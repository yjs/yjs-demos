# ProseMirror + Dat Demo
> [y-prosemirror](https://docs.yjs.dev/ecosystem/editor-bindings/prosemirror) / [y-dat](https://docs.yjs.dev/ecosystem/connection-provider/y-hyper) / [Live Demo](https://demos.yjs.dev/prosemirror/prosemirror.html)

This is a demo of a [ProseMirror](https://prosemirror.net/) editor that was made collaborative with Yjs & y-prosemirror. This demo uses the [prosemirror-example-setup](https://github.com/ProseMirror/prosemirror-example-setup) as a configuration. Learn more about how you can build your own custom editor with ProseMirror in [their documentation](https://github.com/yjs/y-prosemirror/).

In this variation of the ProseMirror demo, we use [y-dat](https://docs.yjs.dev/ecosystem/connection-provider/y-hyper) as a synchronization protocol (aka the provider). [Hyper](https://hypercore-protocol.org/) (previously known as [Dat](https://dat.foundation/)) is a distributed append-only log that allows you to build encrypted peer-to-peer applications without a central server.

This demo already supports offline editing since y-dat persists document updates in the local browser.

## Quick Start

```sh
npm i
npm start
# Project is running at http://localhost:8080/
```
