/* eslint-env browser */

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from './schema.js'
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'
import { attachVersion } from '../lib/version.js'
import * as random from 'lib0/random.js'

const testUsers = [
  { username: 'Alice', color: '#ecd444', lightColor: '#ecd44433' },
  { username: 'Bob', color: '#ee6352', lightColor: '#ee635233' },
  { username: 'Max', color: '#6eeb83', lightColor: '#6eeb8333' }
]

const colors = [
  { light: '#ecd44433', dark: '#ecd444' },
  { light: '#ee635233', dark: '#ee6352' },
  { light: '#6eeb8333', dark: '#6eeb83' }
]

const user = random.oneOf(testUsers)

const ydoc = new Y.Doc()
const permanentUserData = new Y.PermanentUserData(ydoc)
permanentUserData.setUserMapping(ydoc, ydoc.clientID, user.username)
ydoc.gc = false
const provider = new WebrtcProvider('prosemirror-versions-webrtc', ydoc)

window.addEventListener('load', () => {
  const type = ydoc.getXmlFragment('prosemirror')

  const editor = document.createElement('div')
  editor.setAttribute('id', 'editor')
  const editorContainer = document.createElement('div')
  editorContainer.insertBefore(editor, null)
  const prosemirrorView = new EditorView(editor, {
    state: EditorState.create({
      schema,
      plugins: [
        ySyncPlugin(type, { permanentUserData, colors }),
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

  attachVersion(/** @type {HTMLElement} */ (document.getElementById('y-version')), ydoc, prosemirrorView)

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

  provider.on('peers', change => { console.log(change) })

  // @ts-ignore
  window.example = { provider, ydoc, type, prosemirrorView }
})
