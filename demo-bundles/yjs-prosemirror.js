// import './yjs.js'
import * as yProsemirror from 'y-prosemirror'
import State from 'prosemirror-state'
import View from 'prosemirror-view'
import PMExample from 'prosemirror-example-setup'
import Keymap from 'prosemirror-keymap'
import Model from 'prosemirror-model'

const mapToWindow = () => {
  for (let key in module) {
    window[key] = module[key]
  }
}

[yProsemirror, State, View, PMExample, Keymap, Model].forEach(mapToWindow)
