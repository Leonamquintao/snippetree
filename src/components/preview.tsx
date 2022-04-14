import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, '*');
  }, [code]);

  const iframeRef = useRef<any>();
  return (
    <iframe
      title='preview'
      ref={iframeRef}
      sandbox='allow-scripts'
      srcDoc={html}
    />
  );
};

export default Preview;