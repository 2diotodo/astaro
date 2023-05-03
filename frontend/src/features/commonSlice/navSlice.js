import { createSlice } from "@reduxjs/toolkit";

// 네비바 open,close 관리

const initialState = {
  toogle: false,
};

const navSlice = createSlice({
  name: "navSlice",
  initialState: initialState,
  reducers: {
    toogleNavBar: (state, action) => {
      // console.log(state.toogle, '이것은 toogle값.');
      state.toogle = action.payload;
    },
  },
});

export const { toogleNavBar } = navSlice.actions;
export default navSlice.reducer;
