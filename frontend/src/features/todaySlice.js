import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  cardsSeq: [],
};

const tarotSlice = createSlice({
  name: "tarot",
  initialState: initialState,
  reducers: {
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
