import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App';
import FullscreenSpinner from './components/FullscreenSpinner';

const rootElem = document.getElementById('root');
if (!rootElem) throw new Error('Failed to find root element.');
const root = ReactDOM.createRoot(rootElem);

root.render(
  <React.StrictMode>
    <Suspense fallback={<FullscreenSpinner />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
