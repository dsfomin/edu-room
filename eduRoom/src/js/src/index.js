import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store, { Persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux"
import i18n from "./services/i18n";
import { I18nextProvider } from "react-i18next";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  , document.getElementById('root')
);