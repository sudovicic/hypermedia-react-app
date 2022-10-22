import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElem = document.getElementById('root');
if (!rootElem) throw new Error('Failed to find root element.');
const root = ReactDOM.createRoot(rootElem);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
