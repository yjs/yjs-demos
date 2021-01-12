/* eslint-env browser */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'

import { keymap } from 'prosemirror-keymap'

import {
  Editor,
  EditorContext,
  ReactEditorView
} from '@atlaskit/editor-core'

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider('wss://demos.yjs.dev', 'atlaskit-demo', ydoc)
  const yXmlFragment = ydoc.get('prosemirror-atlaskit', Y.XmlFragment)

  const connectBtn = document.getElementById('y-connect-btn')
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  /**
   * The Atlasian Editor does not provide a method to add custom ProseMirror plugins.
   * This hack intercepts the generation of Atlassian edits so we can extend it.
   *
   * Ideally you would fork ProseMirror and add the Yjs plugin properly.
   */
  const originalGetPlugins = ReactEditorView.prototype.getPlugins
  ReactEditorView.prototype.getPlugins = function () {
    return originalGetPlugins.apply(this, arguments).concat([{
      name: 'yjs-plugin',
      pmPlugins: function () {
        return [
          {
            name: 'y-shared-content',
            plugin: function (_a) {
              return ySyncPlugin(yXmlFragment)
            }
          }, {
            name: 'y-shared-cursors',
            plugin: function (_a) {
              return yCursorPlugin(provider.awareness)
            }
          }, {
            name: 'y-undo-plugin',
            plugin: yUndoPlugin
          }, {
            name: 'y-undo-keymaps',
            plugin: () => keymap({
              'Mod-z': undo,
              'Mod-y': redo,
              'Mod-Shift-z': redo
            })
          }
        ]
      }
    }])
  }

  class ExampleEditorFullPage extends React.Component {
    render () {
      return (
        <Editor
          defaultValue={this.props.defaultValue}
          appearance='full-page'
          allowCodeBlocks={{ enableKeybindingsForIDE: true }}
          allowLists
          allowBreakout
          allowTextColor
          allowTextAlignment
          allowIndentation
          allowTables={{
            allowColumnResizing: true,
            allowMergeCells: true,
            allowNumberColumn: true,
            allowBackgroundColor: true,
            allowHeaderRow: true,
            allowHeaderColumn: true,
            permittedLayouts: 'all',
            stickToolbarToBottom: true
          }}
          allowJiraIssue
          allowUnsupportedContent
          allowPanel
          allowStatus
          allowExtension={{
            allowBreakout: true
          }}
          allowRule
          allowDate
          allowLayouts
          allowDynamicTextSizing
          placeholder='Write something...'
          shouldFocus
          disabled={false}
        />
      )
    }
  }

  ReactDOM.render(
    <EditorContext>
      <ExampleEditorFullPage />
    </EditorContext>,
    document.getElementById('editor')
  )

  window.example = { provider, ydoc, yXmlFragment }
})
