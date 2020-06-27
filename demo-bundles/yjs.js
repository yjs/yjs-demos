
// @ts-nocheck
// eslint-disable

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { WebrtcProvider } from 'y-webrtc'
import { IndexeddbPersistence } from 'y-indexeddb'

window.Y = Y
window.WebsocketProvider = WebsocketProvider
window.WebrtcProvider = WebrtcProvider
window.IndexeddbPersistence = IndexeddbPersistence

// This is a fix for input events in jsfiddle.
// When the same jsfiddle is included several times as an iframe,
// the input event is fired in both windows because it propagates up.
// There is no need to propagate input events to the parent window.
document.addEventListener('input', event => {
  event.stopPropagation()
})
