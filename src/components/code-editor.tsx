import React, { useRef } from "react";
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {

  const editorRef = useRef<any>();

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
    editor.getModel()?.updateOptions({ tabSize: 1 });
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button 
        className='button button-format is-primary is-small'
        onClick={onFormatClick}>
          Format
      </button>
      <MonacoEditor
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
    </div>
  );
};

export default CodeEditor;