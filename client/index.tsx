import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'bulma';
import { ModalContextProvider } from './common/contexts/modal';
import { ToastContextProvider } from './common/contexts/toast';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
