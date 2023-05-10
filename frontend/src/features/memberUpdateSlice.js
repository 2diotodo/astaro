import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@utils/axiosInstance";

// 회원 회원정보 조회, 정보수정, 프로필수정

const initialState = {
  memberId: "",
  password: "",
  nickname: "",
  profile: 1,
  email: "",
  lux: 0,
  heal: 0,
};

const token = `${localStorage.getItem("access-token")}`;
// const baseURL = `http://localhost:8000/member-service`;
const baseURL = `${process.env.REACT_APP_BACKEND_URL}/member-service`;
// 회원정보 조회
export const getMember = createAsyncThunk(
  "memberUpdateSlice/getMember",
  async () => {
    const url = `${baseURL}/member/users`;
    const response = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "GET",
      url: url,
    });
    return response.data;
  }
);
// 회원정보 수정
export const update = createAsyncThunk(
  "memberUpdateSlice/update",
  async (values) => {
    const request = {
      password: values.password,
      nickname: values.nickname,
    };
    const url = `${baseURL}/member/update/memberInfo`;
    const response = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "PUT",
      url: url,
      data: request,
    });
    return response.data;
  }
);
// 프로필 수정
export const profileUpdate = createAsyncThunk(
  "memberUpdateSlice/profileUpdate",
  async (values) => {
    const request = {
      profile: values.profile,
    };
    const url = `${baseURL}/member/update/profile`;
    const response = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "PUT",
      url: url,
      data: request,
    });
    return response.data;
  }
);

// 회원탈퇴
export const remove = createAsyncThunk("memberUpdateSlice/remove", async () => {
  const url = `${baseURL}/member/update/isDeleted`;
  const response = await axios({
    headers: { Authorization: `Bearer ${token}` },
    method: "PUT",
    url: url,
  });
  return response.data;
});

const memberSlice = createSlice({
  name: "memberUpdate",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 회원정보 가져오기
    builder.addCase(getMember.pending, (state, action) => {
      state.loading = true;
      console.log("정보가져오는중", state.result);
    });
    builder.addCase(getMember.fulfilled, (state, action) => {
      state.memberId = action.payload.member.memberId;
      state.nickname = action.payload.member.nickname;
      state.profile = action.payload.member.profile;
      state.email = action.payload.member.email;
      state.lux = action.payload.member.lux;
      state.heal = action.payload.member.heal;
      // console.log(state);
      console.log("회원정보get성공", action.payload.member);
      state.loading = false;
    });
    builder.addCase(getMember.rejected, (state, action) => {
      console.log("회원정보get실패", action.error);
      state.loading = false;
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

    // 프로필 수정
    builder.addCase(profileUpdate.pending, (state, action) => {
      console.log("프로필 수정중", state.result);
    });
    builder.addCase(profileUpdate.fulfilled, (state, action) => {
      console.log("프로필 수정성공", action.payload);
    });
    builder.addCase(profileUpdate.rejected, (state, action) => {
      console.log("프로필 수정실패", action.error);
    });

    // 탈퇴
    builder.addCase(remove.pending, (state, action) => {
      console.log("탈퇴중", state.result);
    });
    builder.addCase(remove.fulfilled, (state, action) => {
      console.log("탈퇴 성공", action.payload);
    });
    builder.addCase(remove.rejected, (state, action) => {
      console.log("탈퇴 실패", action.error);
    });
  },
});

export default memberSlice.reducer;
