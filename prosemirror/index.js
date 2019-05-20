/* eslint-env browser */

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { prosemirrorPlugin, cursorPlugin } from 'y-prosemirror'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from './schema.js'
import { exampleSetup } from 'prosemirror-example-setup'
// import { noteHistoryPlugin } from './prosemirror-history.js'

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider(`${location.protocol === 'http:' ? 'ws:' : 'wss:'}${location.host}`, 'prosemirror', ydoc)
  const type = ydoc.get('prosemirror', Y.XmlFragment)

  const editor = document.createElement('div')
  editor.setAttribute('id', 'editor')
  const editorContainer = document.createElement('div')
  editorContainer.insertBefore(editor, null)
  const prosemirrorView = new EditorView(editor, {
    state: EditorState.create({
      schema,
      plugins: exampleSetup({ schema }).concat([prosemirrorPlugin(type), cursorPlugin(provider.awareness)])
    })
  })
  document.body.insertBefore(editorContainer, null)

  const connectBtn = document.querySelector('.y-connect-btn')
  connectBtn.addEventListener('click', () => {
    if (provider.wsconnected) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  window.example = { provider, ydoc, type, prosemirrorView }
})
