import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  stars: [],
  category: "연애",
};

// 비동기 요청
export const fetchTaroResult = createAsyncThunk("star/fetchTaroResult", async (memberSeq, { getState }) => {
  const { category } = getState().category;
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/board-service/api/v1/star/${memberSeq}?category=${category}`);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
});

const starSlice = createSlice({
  name: "star",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaroResult.fulfilled, (state, action) => {
    });
  },
});

export const { setCategory } = starSlice.actions; // Add this line to export the setCategory action

export default starSlice.reducer;