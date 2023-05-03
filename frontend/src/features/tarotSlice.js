import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  cards: [],
  cardsSeq: [],
};

const tarotSlice = createSlice({
  name: "tarot",
  initialState: initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setCardsSeq: (state, action) => {
      state.cardsSeq = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCategory, setCards, setCardsSeq } = tarotSlice.actions;
export default tarotSlice.reducer;
