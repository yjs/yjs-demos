import { toggleMark } from "prosemirror-commands";
import React from "react";

import { useEditorEventCallback, useEditorState } from "@nytimes/react-prosemirror";

// lifted from:
// https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/menu.ts#L58
function isMarkActive(mark, state) {
  const { from, $from, to, empty } = state.selection;
  return empty
    ? !!mark.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, mark);
}

export function Button(props) {
  return (
    <button
      type="button"
      title={props.title}
      aria-pressed={props.isActive}
      className={`button ${props.className}`}
      onClick={props.onClick}
    >
      <span className="visually-hidden">{props.title}</span>
      <span aria-hidden>{props.children}</span>
    </button>
  );
}

export default function Menu() {
  const state = useEditorState();

  const toggleBold = useEditorEventCallback((view) => {
    const toggleBoldMark = toggleMark(view.state.schema.marks["strong"]);
    toggleBoldMark(view.state, view.dispatch, view);
  });

  const toggleItalic = useEditorEventCallback((view) => {
    const toggleItalicMark = toggleMark(view.state.schema.marks["em"]);
    toggleItalicMark(view.state, view.dispatch, view);
  });

  return (
    <div className="menu">
      <Button
        className="bold"
        title="Bold (⌘b)"
        isActive={isMarkActive(state.schema.marks["strong"], state)}
        onClick={toggleBold}
      >
        B
      </Button>
      <Button
        className="italic"
        title="Italic (⌘i)"
        isActive={isMarkActive(state.schema.marks["em"], state)}
        onClick={toggleItalic}
      >
        I
      </Button>
    </div>
  );
}
