import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

const navSlice = createSlice({
  name: "navBars",
  initialState: initialState,
  reducers: {
    toggleNavBar: (state, action) => {
      state.toggle = action.payload;
    },
  },
});

export const { toggleNavBar } = navSlice.actions;
export default navSlice.reducer;
