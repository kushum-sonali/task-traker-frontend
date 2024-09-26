// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../store/Store";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist'
import { persistor } from '../store/Store'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
    <PersistGate persistor={persistor } loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
