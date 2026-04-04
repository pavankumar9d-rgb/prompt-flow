"use client";

import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

interface PlaygroundEditorProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  readonly?: boolean;
}

export function PlaygroundEditor({ value, onChange, className, readonly = false }: PlaygroundEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        keymap.of(defaultKeymap),
        javascript({ typescript: true }),
        oneDark,
        EditorView.theme({
          "&": { height: "100%", backgroundColor: "transparent !important" },
          ".cm-scroller": { fontFamily: "var(--font-mono, monospace)" },
          ".cm-gutters": { backgroundColor: "transparent", border: "none" },
          ".cm-content": { caretColor: "#7c3aed" }
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !readonly) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorState.readOnly.of(readonly),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Compile only once

  // Update editor when value changes externally
  useEffect(() => {
    const view = viewRef.current;
    if (view && value !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div 
      className={`h-full w-full bg-[#0D0D10] border border-white/[0.06] rounded-xl overflow-hidden ${className}`} 
      ref={editorRef} 
    />
  );
}
