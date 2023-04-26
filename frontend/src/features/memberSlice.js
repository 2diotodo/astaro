import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "@features/port";

// 회원 로그인, 로그아웃, 회원가입 관리

const initialState = {
  memberId: "",
  password: "",
  nickname: "",
  email: "",
};
// 로그인
export const signin = createAsyncThunk("memberSlice/signin", async (logins) => {
  const request = {
    memberId: logins.memberId,
    password: logins.password,
  };
  const url = `${baseURL}member/signin`;
  const response = await axios({
    method: "POST",
    url: url,
    data: request,
  });
  return response.data;
});

// 회원가입
export const signup = createAsyncThunk("memberSlice/signup", async (values) => {
  const request = {
    memberId: values.memberId,
    password: values.password,
    nickname: values.nickname,
    email: values.email,
  };
  const url = `${baseURL}member/signup`;
  const response = await axios({
    method: "POST",
    url: url,
    data: request,
  });
  return response.data;
});

export const duplicateId = createAsyncThunk(
  "memberSlice/duplicateId",
  async (memberId) => {
    const url = `${baseURL}exist/id/${memberId}`;
    const response = await axios({
      method: "GET",
      url: url,
      data: memberId,
    });
    return response.data;
  }
);

const memberSlice = createSlice({
  name: "memberCheck",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(signin.pending, (state, action) => {
      console.log("로그인중", state.result);
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      console.log("로그인성공", state.result);
    });
    builder.addCase(signin.rejected, (state, action) => {
      console.log("로그인실패", action.error);
    });

    // 회원가입
    builder.addCase(signup.pending, (state, action) => {
      console.log("회원가입중", action.payload);
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("회원가입성공", state.result);
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log("회원가입실패", action.error);
    });

    // 아이디중복확인
    builder.addCase(duplicateId.pending, (state, action) => {
      console.log("아이디중복확인중", action.payload);
    });
    builder.addCase(duplicateId.fulfilled, (state, action) => {
      console.log("아이디중복확인성공", state.result);
    });
    builder.addCase(duplicateId.rejected, (state, action) => {
      console.log("아이디중복확인실패", action.error);
    });
  },
});

// export const { isLogin, isLogout, memberSearch } = memberSlice.actions;
export default memberSlice.reducer;
