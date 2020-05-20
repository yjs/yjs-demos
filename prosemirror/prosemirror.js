/* eslint-env browser */

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from './schema.js'
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'

function createProseMirrorView (provider, name) {
  const type = provider.doc.getXmlFragment(name)

  const editor = document.createElement('div')
  editor.setAttribute('id', 'editor_' + name)
  const editorContainer = document.createElement('div')
  editorContainer.insertBefore(editor, null)

  const prosemirrorView = new EditorView(editor, {
    state: EditorState.create({
      schema,
      plugins: [
        ySyncPlugin(type),
        yCursorPlugin(provider.awareness, { cursorId: name }),
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

  // @ts-ignore
  window[name] = { type, prosemirrorView }
}

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider('wss://demos.yjs.dev', 'prosemirror', ydoc)

  const connectBtn = /** @type {HTMLElement} */ (document.getElementById('y-connect-btn'))
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  createProseMirrorView(provider, 'prosemirror')
  createProseMirrorView(provider, 'second_prosemirror')

  window.example = { provider, ydoc }
})
