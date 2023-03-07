import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'bulma';
import { ToastContextProvider } from './common/contexts/toast';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
