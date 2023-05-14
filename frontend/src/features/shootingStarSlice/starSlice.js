import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  stars: [],
  category: "연애",
};

// const baseURL = "http://localhost:8000/board-service/";
const baseURL = `${process.env.REACT_APP_BACKEND_URL}/board-service/`;

const token = `${localStorage.getItem("access-token")}`;

// 비동기 요청
export const fetchTaroResult = createAsyncThunk("star/fetchTaroResult", async (category) => {
  const url = `${baseURL}api/v1/star?category=${category}`;
  const response = await axios({
    headers: { Authorization: `Bearer ${token}` },
    method: "GET",
    url: url,
  });
  return response.data;
});

const starSlice = createSlice({
  name: "star",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaroResult.fulfilled, (state, action) => {});
  },
});

export const { setCategory } = starSlice.actions; // Add this line to export the setCategory action

export default starSlice.reducer;
