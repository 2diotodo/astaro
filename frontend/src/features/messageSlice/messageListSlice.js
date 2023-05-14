import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const baseURL = "http://localhost:8000/board-service/";
const baseURL = `${process.env.REACT_APP_BACKEND_URL}/board-service/`;

const initialState = {
  seq: "",
};

const token = `${localStorage.getItem("access-token")}`;

// 채팅방 불러오기
export const getMessageList = createAsyncThunk("messageListSlice/getMessageList", async () => {
  const url = `${baseURL}api/v1/room`;
  const response = await axios({
    headers: { Authorization: `Bearer ${token}` },
    method: "GET",
    url: url,
  });
  return response.data;
});

// 채팅방 업데이트
export const updateMessageList = createAsyncThunk(
  "messageListSlice/updateMessageList",
  async (messageList) => {
    const url = `${baseURL}api/v1/room/${messageList.seq}`;
    const response = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "PATCH",
      url: url,
      data: messageList,
    });
    return response.data;
  }
);

const messageListSlice = createSlice({
  name: "messageListCheck",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 채팅방 불러오기
    builder.addCase(getMessageList.pending, (state, action) => {
      console.log("채팅방 불러오기 중", state.result);
    });
    builder.addCase(getMessageList.fulfilled, (state, action) => {
      console.log("채팅방 불러오기 성공", state.result);
    });
    builder.addCase(getMessageList.rejected, (state, action) => {
      console.log("채팅방 불러오기 실패", action.error);
    });

    // 채팅방 업데이트
    builder.addCase(updateMessageList.pending, (state, action) => {
      console.log("채팅방 업데이트 중", state.result);
    });
    builder.addCase(updateMessageList.fulfilled, (state, action) => {
      console.log("채팅방 업데이트 성공", state.result);
    });
    builder.addCase(updateMessageList.rejected, (state, action) => {
      console.log("채팅방 업데이트 실패", action.error);
    });
  },
});

export default messageListSlice.reducer;
