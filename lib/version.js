
import { html, render } from 'lit-html'
import * as Y from 'yjs'
import { EditorView } from 'prosemirror-view' // eslint-disable-line
import { ySyncPluginKey } from 'y-prosemirror'
import * as dom from 'lib0/dom.js'
import * as pair from 'lib0/pair.js'

/**
 * @typedef {Object} Version
 * @property {number} date
 * @property {Uint8Array} snapshot
 * @property {number} clientID
 */

/**
 * @param {Y.Doc} doc
 */
const addVersion = doc => {
  const versions = doc.getArray('versions')
  const prevVersion = versions.length === 0 ? null : versions.get(versions.length - 1)
  const prevSnapshot = prevVersion === null ? Y.emptySnapshot : Y.decodeSnapshot(prevVersion.snapshot)
  const snapshot = Y.snapshot(doc)
  if (prevVersion !== null) {
    // account for the action of adding a version to ydoc
    prevSnapshot.sv.set(prevVersion.clientID, prevSnapshot.sv.get(prevVersion.clientID) + 1)
  }
  if (!Y.equalSnapshots(prevSnapshot, snapshot)) {
    versions.push([{
      date: new Date().getTime(),
      snapshot: Y.encodeSnapshot(snapshot),
      clientID: doc.clientID
    }])
  }
}

const liveTracking = dom.element('input', [
  pair.create('type', 'checkbox'),
  pair.create('name', 'yjs-live-tracking'),
  pair.create('value', 'Live Tracking ')
])

const updateLiveTrackingState = editorstate => {
  setTimeout(() => {
    const syncState = ySyncPluginKey.getState(editorstate.state)
    liveTracking.checked = syncState.prevSnapshot != null && syncState.snapshot == null
  }, 500)
}

const renderVersion = (editorview, version, prevSnapshot) => {
  editorview.dispatch(editorview.state.tr.setMeta(ySyncPluginKey, { snapshot: Y.decodeSnapshot(version.snapshot), prevSnapshot: prevSnapshot == null ? Y.emptySnapshot : Y.decodeSnapshot(prevSnapshot) }))
  updateLiveTrackingState(editorview)
}

const unrenderVersion = editorview => {
  const binding = ySyncPluginKey.getState(editorview.state).binding
  if (binding != null) {
    binding.unrenderSnapshot()
  }
  updateLiveTrackingState(editorview)
}

/**
 * @param {EditorView} editorview
 * @param {Version} version
 * @param {Version|null} prevVersion
 */
const versionTemplate = (editorview, version, prevSnapshot) => html`<div class="version-list" @click=${e => renderVersion(editorview, version, prevSnapshot)}>${new Date(version.date).toLocaleString()}</div>`

const versionList = (editorview, doc) => {
  const versions = doc.getArray('versions')
  return html`<div>${versions.length > 0 ? versions.map((version, i) => versionTemplate(editorview, version, i > 0 ? versions.get(i - 1).snapshot : null)) : html`<div>No snapshots..</div>`}</div>`
}

const snapshotButton = doc => {
  return html`<button @click=${(e) => addVersion(doc)}>Snapshot</button>`
}

/**
 * @param {HTMLElement} parent
 * @param {Y.Doc} doc
 * @param {EditorView} pmview
 */
export const attachVersion = (parent, doc, editorview) => {
  let open = false
  const rerender = () => {
    render(html`<div class="version-modal" ?hidden=${open}>${snapshotButton(doc)}${versionList(editorview, doc)}</div>`, vContainer)
  }
  updateLiveTrackingState(editorview)
  liveTracking.addEventListener('click', e => {
    if (liveTracking.checked) {
      const versions = doc.getArray('versions')
      const lastVersion = versions.length > 0 ? Y.decodeSnapshot(versions.get(versions.length - 1).snapshot) : Y.emptySnapshot
      editorview.dispatch(editorview.state.tr.setMeta(ySyncPluginKey, { snapshot: null, prevSnapshot: lastVersion }))
    } else {
      unrenderVersion(editorview)
    }
  })
  parent.insertBefore(liveTracking, null)
  parent.insertBefore(dom.element('label', [
    pair.create('for', 'yjs-live-tracking')
  ], [
    dom.text('Live Tracking ')
  ]), null)
  const btn = document.createElement('button')
  btn.setAttribute('type', 'button')
  btn.textContent = 'Versions'
  btn.addEventListener('click', () => {
    open = !open
    unrenderVersion(editorview)
    rerender()
  })
  const vContainer = document.createElement('div')
  parent.insertBefore(btn, null)
  parent.insertBefore(vContainer, null)
  doc.getArray('versions').observe(rerender)
  rerender()
}
