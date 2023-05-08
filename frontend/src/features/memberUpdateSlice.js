import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@utils/axiosInstance";

// 회원 정보가져오기, 정보수정, 프로필수정

const initialState = {
  memberId: "",
  password: "",
  nickname: "",
  profile: "",
  email: "",
  lux: "",
  heal: "",
};

const baseURL = `${process.env.REACT_APP_BACKEND_URL}/member-service/auth`;
// 정보가져오기
export const getMember = createAsyncThunk(
  "memberUpdateSlice/getMember",
  async () => {
    const request = {};
    const url = `${baseURL}/member/users`;
    const response = await axios({
      headers: { Authorization: localStorage.getItem("access-token") },
      method: "GET",
      url: url,
      data: request,
    });
    return response.data;
  }
);
// 회원정보 수정
export const update = createAsyncThunk(
  "memberUpdateSlice/update",
  async (values) => {
    const request = {
      memberId: values.memberId,
      password: values.password,
      nickname: values.nickname,
      profile: values.profile,
      email: values.email,
      lux: values.lux,
      heal: values.heal,
    };
    const url = `${baseURL}/update/profile`;
    const response = await axios({
      headers: { Authorization: localStorage.getItem("access-token") },
      method: "PUT",
      url: url,
      data: request,
    });
    return response.data;
  }
);

const memberSlice = createSlice({
  name: "memberUpdate",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 회원정보 가져오기
    builder.addCase(getMember.pending, (state, action) => {
      console.log("정보가져오는중", state.result);
    });
    builder.addCase(getMember.fulfilled, (state, action) => {
      console.log("회원정보get성공", action.payload);
    });
    builder.addCase(getMember.rejected, (state, action) => {
      console.log("회원정보get실패", action.error);
    });

    // 회원정보수정
    builder.addCase(update.pending, (state, action) => {
      console.log("회원정보수정중", state.result);
    });
    builder.addCase(update.fulfilled, (state, action) => {
      console.log("회원정보수정성공", action.payload);
    });
    builder.addCase(update.rejected, (state, action) => {
      console.log("회원정보수정실패", action.error);
    });
  },
});

// export const { isLogin, isLogout, memberSearch } = memberSlice.actions;
export default memberSlice.reducer;
