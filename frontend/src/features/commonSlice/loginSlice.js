import { createSlice } from "@reduxjs/toolkit";

// 로그인 상태관리

const initialState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: "loginCheck",
  initialState: initialState,
  reducers: {
    isLoginCheck: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { isLoginCheck } = loginSlice.actions;
export default loginSlice.reducer;
