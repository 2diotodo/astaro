import { createSlice } from "@reduxjs/toolkit";

// 로그인 상태관리

const initialState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isLoginCheck: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { isLoginCheck } = loginSlice.actions;
export default loginSlice.reducer;
