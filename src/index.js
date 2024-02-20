import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import booksReducer from "./Reducers/books/booksSlice";
import commentsReducer from "./Reducers/comments/commentsSlice";

const reducer = combineReducers({
  booksData: booksReducer,
  commentsData: commentsReducer,
});

const store = configureStore({
  reducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
