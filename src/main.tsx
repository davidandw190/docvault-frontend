import './index.css';

import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import { setupStore } from './store/store.ts';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
