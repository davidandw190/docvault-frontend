import './index.css';

import App from './App.tsx';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { setupStore } from './store/store.ts';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
