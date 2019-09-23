/* eslint-env browser */

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CodeMirrorBinding } from "y-codemirror";
import CodeMirror from "codemirror";
import 'codemirror/mode/javascript/javascript.js'

window.addEventListener("load", () => {
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(
    `${location.protocol === "http:" ? "ws:" : "wss:"}${location.host}`,
    "codemirror",
    ydoc
  );
  const yText = ydoc.getText("codemirror");
  const editorContainer = document.createElement("div");
  editorContainer.setAttribute("id", "editor");
  document.body.insertBefore(editorContainer, null);

  const editor = CodeMirror(editorContainer, {
    mode: "javascript"
  });

  const binding = new CodeMirrorBinding(yText, editor, provider.awareness);

  const connectBtn = document.getElementById("y-connect-btn");
  connectBtn.addEventListener("click", () => {
    if (provider.shouldConnect) {
      provider.disconnect();
      connectBtn.textContent = "Connect";
    } else {
      provider.connect();
      connectBtn.textContent = "Disconnect";
    }
  });

  window.example = { provider, ydoc, yText, binding };
});
