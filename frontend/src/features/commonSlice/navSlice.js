import { createSlice } from "@reduxjs/toolkit";

// 네비바 open,close 관리

const initialState = {
  toggle: false,
};

const navSlice = createSlice({
  name: "navSlice",
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggleNavBar: (state, action) => {
      // console.log(state.toogle, '이것은 toogle값.');
      state.toggle = action.payload;
    },
  },
});

export const { toggleNavBar } = navSlice.actions;
export default navSlice.reducer;
