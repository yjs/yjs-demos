
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
