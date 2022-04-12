import React, { useEffect, useState, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App: React.FC = () => {

  const esbuildRef = useRef<any>();
  const iframeRef = useRef<any>();

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

  const transpile = async () => {
    if(!esbuildRef.current) return;

    iframeRef.current.srcdoc = html;

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

    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
   <html>
    <head></head>
    <body>
      <div id='root'></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error!</h4>' + err + '</div>';
            throw err;
          }
        }, false);
      </script>
    </body>
   </htm>
  `;

  return (
    <div>
      <CodeEditor 
        initialValue={"const a = 2;"}
        onChange={(value) => setInput(value)}
        />
      <textarea rows={7} cols={70}
        value={input}
        onChange={(e) => setInput(e.target.value)}>
      </textarea>
     <div>
       <button onClick={transpile}>Submit</button>
     </div>
     <iframe title='preview' ref={iframeRef} sandbox='allow-scripts' srcDoc={html} />
    </div>
  );
}

export default App;