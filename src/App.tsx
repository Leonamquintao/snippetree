import React, { useEffect, useState, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';

const App: React.FC = () => {

  const esbuildRef = useRef<any>();
  

  const startService = async () => {
    esbuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  };

  useEffect(() => {
    startService();
  },[]);
  
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const transpile = async () => {
    if(!esbuildRef.current) return;

    const result = await esbuildRef.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    setCode(result.outputFiles[0].text);
  };

  

  return (
    <div>
      <CodeEditor 
        initialValue={code}
        onChange={(value) => setInput(value)}
      />
     <div>
       <button onClick={transpile}>Submit</button>
     </div>
     <Preview code={code} />
    </div>
  );
}

export default App;