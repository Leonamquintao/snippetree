import './preview.css';
import React, { useEffect, useRef } from 'react';
interface PreviewProps {
  code: string;
};

const html = `
  <html>
  <head>
    <style> html {background-color: white;}</style>
  </head>
  <body>
    <div id='root'></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error!</h4>' + err + '</div>';
        throw err;
      };

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
  </htm>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  const iframeRef = useRef<any>();
  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframeRef}
        sandbox='allow-scripts'
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;