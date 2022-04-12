import React, { useRef } from "react";
import MonacoEditor, { OnMount} from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {

  const handleEditorDidMount: OnMount = (editor) => {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
    editor.getModel()?.updateOptions({ tabSize: 1 });
  };

  return <MonacoEditor
    value={initialValue}
    theme='vs-dark'
    language='javascript'
    onMount={handleEditorDidMount}
    height={400}
    options={{
      wordWrap: 'on',
      minimap: {enabled: false},
      showUnused: false,
      folding: false,
      lineNumbersMinChars: 3,
      fontSize: 16,
      scrollBeyondLastLine: false,
      automaticLayout: true,
    }}
  />
};

export default CodeEditor;