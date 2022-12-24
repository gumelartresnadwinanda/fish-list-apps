import React from 'react';
import ReactDOM from 'react-dom/client';
import './Index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import List from './pages/index.js';
import { VariableProvider } from './utils/context';
import 'font-awesome/css/font-awesome.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <VariableProvider>
    <RouterProvider router={router} />
  </VariableProvider>
);

serviceWorkerRegistration.register();
