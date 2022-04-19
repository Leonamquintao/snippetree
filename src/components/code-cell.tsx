import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/code-editor';
import Preview from '../components/preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell: React.FC = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 1000);

    return () => clearTimeout(timer);
  },[input]);

  const initial = 'const root = document.querySelector("#root");';

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor 
            initialValue={initial}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;