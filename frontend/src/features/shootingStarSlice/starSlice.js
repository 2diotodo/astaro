import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  stars: [],
};

// 비동기 요청
export const fetchTaroResult = createAsyncThunk("star/fetchTaroResult", async (memberSeq) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/board-service/api/v1/star/${memberSeq}`);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
});

const starSlice = createSlice({
  name: "star",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaroResult.fulfilled, (state, action) => {
      // 필요한 경우 상태를 변경하세요
    });
  },
});

export default starSlice.reducer;
