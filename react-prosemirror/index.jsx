import React from "react"
import { createRoot } from "react-dom/client"
import { EditorState } from "prosemirror-state"
import { ProseMirror, ProseMirrorDoc, reactKeys } from "@handlewithcare/react-prosemirror"

import { exampleSetup } from 'prosemirror-example-setup'
import { schema } from "prosemirror-schema-basic"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo, initProseMirrorDoc } from 'y-prosemirror'

const roomname = `prosemirror-react-demo-${new Date().toLocaleDateString('en-CA')}`

const ydoc = new Y.Doc()
const provider = new WebsocketProvider(
  'wss://demos.yjs.dev/ws', // use the public ws server
  // `ws${location.protocol.slice(4)}//${location.host}/ws`, // alternatively: use the local ws server (run `npm start` in root directory)
  roomname,
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
      keymap(baseKeymap),
      reactKeys(),
    ].concat(exampleSetup({ schema }))
  });

  window.example = { ydoc, provider, yXmlFragment, pmDoc: doc }

  return (
    <ProseMirror defaultState={defaultState}>
      <ProseMirrorDoc />
    </ProseMirror>
  );

}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

