import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@utils/axiosInstance";
import { toast } from "react-toastify";

// 회원 로그인, 로그아웃, 회원가입 관리

const initialState = {
  memberId: "",
  password: "",
  nickname: "",
  email: "",
};

const baseURL = `${process.env.REACT_APP_BACKEND_URL}/member-service/auth`;

// 로그인
export const login = createAsyncThunk("memberSlice/login", async (logins) => {
  const request = {
    memberId: logins.memberId,
    password: logins.password,
  };
  const url = `${baseURL}/login`;
  const response = await axios({
    method: "POST",
    url: url,
    data: request,
  }).then((res) => {
    console.log("res", res.data);
    localStorage.setItem("access-token", res.data.accessToken);
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
  const url = `${baseURL}/signup`;
  const response = await axios({
    method: "POST",
    url: url,
    data: request,
  });
  return response.data;
});

// 아이디 중복확인
export const duplicateId = createAsyncThunk(
  "memberSlice/duplicateId",
  async (memberId) => {
    const url = `${baseURL}/check/id/${memberId}`;
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
    builder.addCase(login.pending, (state, action) => {
      console.log("로그인중", action.payload);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("로그인성공", action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
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
