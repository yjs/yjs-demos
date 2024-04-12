
# Yjs Demos [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/yjs/yjs-demos)
> A starting point for your own ideas - PRs welcome

We have a more complete [Getting Started Guide](https://docs.yjs.dev/getting-started/a-collaborative-editor) in our official documentation website.

* 3D model collaboration using the [Vertex Viewer](https://developer.vertexvis.com/). [Open Demo Site](https://collaboration.vertexvis.io/).
* Shared Editing using the [ProseMirror](http://prosemirror.net/) editor - [Open Directory](./prosemirror/)
* Shared Editing using the [ProseMirror](http://prosemirror.net/) editor with
  versioning support - [Open Directory](./prosemirror-versions/)
* Shared Editing using the [Quill](https://quilljs.com/) editor - [Open Directory](./quill/)
* Shared Editing using the [Monaco](https://microsoft.github.io/monaco-editor/)
  editor - [Open Directory](./monaco/)
* Shared Editing using the [CodeMirror](https://codemirror.net/)
  editor - [Open Directory](./codemirror/)
* Shared Editing using the [CodeMirror.next](https://codemirror.net/6/)
  editor - [Open Directory](./codemirror.next/)

## Getting Started

If you are new to Yjs and you just want to play around clone this repository and
use one of the demo directories that interests you the most.

```sh
git clone https://github.com/yjs/yjs-demos.git
npm install
cd yjs-demos/${demo-directory}
npm install
npm start
```

The demos use a public [`y-websocket`](https://github.com/yjs/y-websocket)
instance for communication. Try using one of the [other connection providers](https://docs.yjs.dev/ecosystem/connection-provider) or setting up
your own endpoint.

### (Un)License

The demos are released to the public domain - [Unlicense](./LICENSE).
