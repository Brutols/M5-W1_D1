import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDarkMode: false };

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    handleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      console.log(state.isDarkMode);
    },
  },
});

export const isDarkModeActive = (state) => state.darkModeData.isDarkMode
export const { handleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
