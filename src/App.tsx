import React, { useEffect, useState, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

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

  const html = `
    <script>
      ${code}
    </script>
  `;

  return (
    <div>
     <textarea rows={7} cols={70}
      value={input}
      onChange={(e) => setInput(e.target.value)}>
     </textarea>
     <div>
       <button onClick={transpile}>Submit</button>
     </div>
     <pre>{code}</pre>

     <iframe sandbox='allow-scripts' srcDoc={html} />
    </div>
  );
}

export default App;