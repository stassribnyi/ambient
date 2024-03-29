import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { Layout } from './components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>,
);
