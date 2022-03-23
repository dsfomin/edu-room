import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store, { Persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux"


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  , document.getElementById('root')
);