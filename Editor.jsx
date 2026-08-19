import React, { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

export default function Editor({ code, onChange, lang }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const view = new EditorView({
      doc: code,
      extensions: [
        basicSetup,
        lang === "html" && html(),
        lang === "css" && css(),
        lang === "js" && javascript(),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        })
      ],
      parent: editorRef.current
    });

    return () => view.destroy();
  }, [lang]);

  return <div ref={editorRef} className="editor-container" />;
}
