import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLDivElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

