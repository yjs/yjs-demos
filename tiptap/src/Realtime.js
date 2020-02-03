// Copyright (c) 2019 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright

import { keymap } from 'prosemirror-keymap'
import { Extension } from 'tiptap'
import { redo, undo, ySyncPlugin, yUndoPlugin } from 'y-prosemirror'
import * as Y from 'yjs'

const ydoc = new Y.Doc()

ydoc.on('update', (updateMessage, origin) => {
  console.log('update', updateMessage, origin)
})

// const provider = new WebsocketProvider('wss://demos.yjs.dev', 'prosemirror', ydoc)
const type = ydoc.getXmlFragment('prosemirror')

export default class RealtimeExtension extends Extension {

  get name() {
    return 'realtime'
  }

  // get defaultOptions() {
  //   return {
  //     emptyNodeClass: 'is-empty'
  //   }
  // }

  get plugins() {
    return [
      ySyncPlugin(type),
      // yCursorPlugin(provider.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
    ]
  }

}
