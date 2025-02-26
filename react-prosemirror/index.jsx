import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import { EditorState } from "prosemirror-state"
import { ProseMirror } from "@nytimes/react-prosemirror"

import { exampleSetup } from 'prosemirror-example-setup'
import { schema } from "prosemirror-schema-basic"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo, initProseMirrorDoc } from 'y-prosemirror'


const ydoc = new Y.Doc()
const provider = new WebsocketProvider(
  'wss://demos.yjs.dev/ws', // use the public ws server
  // `ws${location.protocol.slice(4)}//${location.host}/ws`, // alternatively: use the local ws server (run `npm start` in root directory)
  'prosemirror-demo-2024/06',
  ydoc
)

function App () {
  const yXmlFragment = ydoc.getXmlFragment('prosemirror')
  const { doc, mapping } = initProseMirrorDoc(yXmlFragment, schema)
  const defaultState = EditorState.create({ 
    doc,
    schema,
    plugins: [
      ySyncPlugin(yXmlFragment, { mapping }),
      yCursorPlugin(provider.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo
      }),
      keymap(baseKeymap)
    ].concat(exampleSetup({ schema }))
  });


  // It's important that mount is stored as state,
  // rather than a ref, so that the ProseMirror component
  // is re-rendered when it's set
  const [mount, setMount] = useState(null);

  return (
    <ProseMirror mount={mount} defaultState={defaultState}>
      <div ref={setMount} />
    </ProseMirror>
  );
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
