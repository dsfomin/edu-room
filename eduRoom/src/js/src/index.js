import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.render(
  <BrowserRouter>
    <PersistGate loading={null} persistor={Persistor}>
      <App />
    </PersistGate>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
