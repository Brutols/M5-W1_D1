import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import axios from "axios";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import booksReducer from "../../Reducers/books/booksSlice";
import darkModeReducer from "../../Reducers/darkMode/darkModeSlice";
import navInputReducer from "../../Reducers/NavInput/navInputSlice";

const reducer = combineReducers({
  booksData: booksReducer,
  darkModeData: darkModeReducer,
  navInputData: navInputReducer,
});

const store = configureStore({
  reducer,
});

test.only("onRender no istances of single comment exists", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  axios.get.mockResolvedValueOnce({
    data: {
      results: [
        {
          asin: "1250082757",
          title: "Born of Vengeance: The League: Nemesis Rising",
          img: "https://images-na.ssl-images-amazon.com/images/I/91J28bj3PYL.jpg",
          price: 26.09,
          category: "scifi",
        },
      ],
    },
  });

  expect(screen.queryByTestId("single_comment")).toBeNull()

});