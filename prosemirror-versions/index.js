/* eslint-env browser */

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from './schema.js'
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'
import { attachVersion } from '../lib/version.js'

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  ydoc.gc = false
  const provider = new WebsocketProvider(`${location.protocol === 'http:' ? 'ws:' : 'wss:'}${location.host}`, 'prosemirror-versions', ydoc)
  const type = ydoc.get('prosemirror', Y.XmlFragment)

  const editor = document.createElement('div')
  editor.setAttribute('id', 'editor')
  const editorContainer = document.createElement('div')
  editorContainer.insertBefore(editor, null)
  const prosemirrorView = new EditorView(editor, {
    state: EditorState.create({
      schema,
      plugins: [
        ySyncPlugin(type),
        yCursorPlugin(provider.awareness),
        yUndoPlugin(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          'Mod-Shift-z': redo
        })
      ].concat(exampleSetup({ schema }))
    })
  })
  document.body.insertBefore(editorContainer, null)

  attachVersion(document.querySelector('#y-version'), ydoc, prosemirrorView)

  const connectBtn = document.querySelector('.y-connect-btn')
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  window.example = { provider, ydoc, type, prosemirrorView }
})
