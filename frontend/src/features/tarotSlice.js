import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateCategory: null,
  stateMessage: null,
  stateCards: [],
  stateCardsInfo: [],
  stateResults: [],
  stateStory: null,
  stateImgUrl: null,
  stateVideoUrl: null,
  stateCurrentCard: null,
};

const tarotSlice = createSlice({
  name: "tarot",
  initialState: initialState,
  reducers: {
    setStateCategory: (state, action) => {
      state.stateCategory = action.payload;
    },
    setStateMessage: (state, action) => {
      state.stateMessage = action.payload;
    },
    setStateCards: (state, action) => {
      state.stateCards = action.payload;
    },
    setStateCardsInfo: (state, action) => {
      state.stateCardsInfo = action.payload;
    },
    setStateResults: (state, action) => {
      state.stateResults = action.payload;
    },
    setStateStory: (state, action) => {
      state.stateStory = action.payload;
    },
    setStateImgUrl: (state, action) => {
      state.stateImgUrl = action.payload;
    },
    setStateVideoUrl: (state, action) => {
      state.stateVideoUrl = action.payload;
    },
    setStateCurrentCard: (state, action) => {
      state.stateCurrentCard = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setStateCategory,
  setStateMessage,
  setStateCards,
  setStateCardsInfo,
  setStateResults,
  setStateStory,
  setStateImgUrl,
  setStateVideoUrl,
  setStateCurrentCard,
} = tarotSlice.actions;
export default tarotSlice.reducer;
