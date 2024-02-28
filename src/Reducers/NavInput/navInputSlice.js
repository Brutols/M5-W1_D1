import { createSlice } from "@reduxjs/toolkit";

const initialState = { isVisible: true };

const navInputSlice = createSlice({
  name: "navInput",
  initialState,
  reducers: {
    setIsVisible: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const isNavVisible = (state) => state.navInputData.isVisible;
export const { setIsVisible } = navInputSlice.actions;

export default navInputSlice.reducer;
