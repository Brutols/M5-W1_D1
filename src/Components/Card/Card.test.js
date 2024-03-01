import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
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

test.only("modal open on card click", async () => {
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

  //on render test if modal is not visible
  expect(screen.queryByRole("dialog")).toBeNull();

  //simulate the click of the card to open the modal
  act(() => {
    fireEvent.click(screen.findByRole("modal_btn"));
  });

  //check if modal is shown correctly
  expect(screen.queryByRole("dialog")).toBeInTheDocument();
});
