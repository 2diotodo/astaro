import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "@utils/axiosInstance";
import { error } from "jquery";

// 회원 로그인, 로그아웃, 회원가입 관리

const initialState = {
  memberId: "",
  password: "",
  nickname: "",
  email: "",
};

// const baseURL = `http://localhost:8000/member-service/auth`;
const baseURL = `${process.env.REACT_APP_BACKEND_URL}/member-service/auth`;

// 로그인
export const login = createAsyncThunk(
  "memberSlice/login",
  async (logins, { rejectWithValue }) => {
    const request = {
      memberId: logins.memberId,
      password: logins.password,
    };
    const url = `${baseURL}/login`;
    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: request,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 회원가입
export const signup = createAsyncThunk("memberSlice/signup", async (values) => {
  const request = {
    memberId: values.memberId,
    password: values.password,
    nickname: values.nickname,
    email: values.email,
  };
  const url = `${baseURL}/signup`;

  try {
    const response = await axios({
      method: "POST",
      url: url,
      data: request,
    });
    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

// 아이디 중복확인
export const duplicateId = createAsyncThunk(
  "memberSlice/duplicateId",
  async (memberId, { rejectWithValue }) => {
    const url = `${baseURL}/check/id/${memberId}`;

    try {
      const response = await axios({
        method: "GET",
        url: url,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 닉네임 중복확인
export const duplicateNn = createAsyncThunk(
  "memberSlice/duplicateNn",
  async (nickname, { rejectWithValue }) => {
    const url = `${baseURL}/check/nickname/${nickname}`;

    try {
      const response = await axios({
        method: "GET",
        url: url,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 이메일 중복확인
export const duplicateEm = createAsyncThunk(
  "memberSlice/duplicateEm",
  async (email, { rejectWithValue }) => {
    const url = `${baseURL}/check/email/${email}`;

    try {
      const response = await axios({
        method: "GET",
        url: url,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const memberSlice = createSlice({
  name: "memberCheck",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(login.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "loginSuccess";
      localStorage.setItem("access-token", action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
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

    // 아이디 중복확인
    builder.addCase(duplicateId.pending, (state, action) => {});
    builder.addCase(duplicateId.fulfilled, (state, action) => {});
    builder.addCase(duplicateId.rejected, (state, action) => {});

    // 닉네임 중복확인
    builder.addCase(duplicateNn.pending, (state, action) => {});
    builder.addCase(duplicateNn.fulfilled, (state, action) => {});
    builder.addCase(duplicateNn.rejected, (state, action) => {});

    // 이메일 중복확인
    builder.addCase(duplicateEm.pending, (state, action) => {});
    builder.addCase(duplicateEm.fulfilled, (state, action) => {});
    builder.addCase(duplicateEm.rejected, (state, action) => {});
  },
});

export const { memberSeq } = memberSlice.actions;
export default memberSlice.reducer;
