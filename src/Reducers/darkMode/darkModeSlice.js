import { createSlice } from "@reduxjs/toolkit";

const theme = localStorage.getItem("theme") || false;

const initialState = { isDarkMode: theme };

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    handleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("theme", `${state.isDarkMode}`);
    },
  },
});

export const isDarkModeActive = (state) => state.darkModeData.isDarkMode;
export const { handleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
