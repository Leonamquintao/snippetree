import React, { useEffect, useState, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';

const App: React.FC = () => {

  const esbuildRef = useRef<any>();

  const startService = async () => {
    esbuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  };

  useEffect(() => {
    startService();
  },[]);
  
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const transpile = async () => {
    if(!esbuildRef.current) return;
    const result = await esbuildRef.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    setCode(result.code);
  };

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
    </div>
  );
}

export default App;