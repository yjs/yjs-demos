/* eslint-env browser */

import * as Y from 'yjs'
import { DatProvider } from 'y-dat'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from './schema.js'
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()

  // Create new Archive if no key is specified.
  // • In the browser, specify the parameter in the url as the location.hash: "localhost:8080#7b0d584fcdaf1de2e8c473393a31f52327793931e03b330f7393025146dc02fb"
  const givenDatKey = location.hash.length > 1 ? location.hash.slice(1) : null

  // @ts-ignore
  const provider = new DatProvider(givenDatKey, ydoc)
  const skey = provider.feed.key.toString('hex')

  console.log(`Collaborating on ${skey} ${givenDatKey === null ? '(generated)' : '(from parameter)'}`)
  location.hash = '#' + skey

  const yXmlFragment = ydoc.getXmlFragment('prosemirror')

  const editor = document.createElement('div')
  editor.setAttribute('id', 'editor')
  const editorContainer = document.createElement('div')
  editorContainer.insertBefore(editor, null)
  const prosemirrorView = new EditorView(editor, {
    state: EditorState.create({
      schema,
      plugins: [
        ySyncPlugin(yXmlFragment),
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

  // @ts-ignore
  window.example = { provider, ydoc, yXmlFragment, prosemirrorView }
})
