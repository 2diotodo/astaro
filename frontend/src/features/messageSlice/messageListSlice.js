import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8082/";

const initialState = {
  seq: "",
};

// 채팅방 불러오기
export const getMessageList = createAsyncThunk(
  "messageListSlice/getMessageList",
  async (memberSeq) => {
    const url = `${baseURL}api/v1/room/${memberSeq}`;
    const response = await axios({
      method: "GET",
      url: url,
    });
    return response.data;
  }
);

// 채팅방 업데이트
export const updateMessageList = createAsyncThunk(
  "messageListSlice/updateMessageList",
  async (messageList) => {
    const url = `${baseURL}api/v1/room/${messageList.seq}`;
    const response = await axios({
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
