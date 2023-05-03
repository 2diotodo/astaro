import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateCategory: null,
  stateMessage: null,
  stateCards: ["The Star", "The Emperor", "The High Priestess"],
  stateCardsSeq: [4,7,5],
  stateResults: [
    "The Star 카드는 희망과 긍정적인 변화를 의미합니다. 이 카드는 당신이 연애에 대한 강한 욕망을 가지고 있음을 보여줍니다. 이제 당신은 과거의 상처를 극복하고 새로운 시작을 하려는 의지를 가지고 있습니다.",
    "The Emperor 카드는 안정적이고 권위 있는 에너지를 나타냅니다. 이 카드는 당신이 연애에 대한 책임감과 결정력을 가지고 있음을 보여줍니다. 당신은 직감을 믿고 자신의 선택을 할 준비가 되어 있습니다.",
    "The High Priestess 카드는 직감력과 숨겨진 지식을 나타냅니다. 이 카드는 당신이 연애에 대한 내면적인 욕구와 바람을 감추고 있음을 보여줍니다. 당신은 자신의 감정을 깊이 생각하고 타인과 소통할 준비가 되어 있습니다.",
    "이 세 장의 카드는 당신이 연애에 대한 강한 욕망과 결정력, 그리고 내면적인 욕구와 직관력을 가지고 있음을 보여줍니다. 이제 당신은 자신의 감정을 깊이 생각하고 타인과 소통할 준비가 되어 있으며, 새로운 시작을 위해 자신의 선택을 할 준비가 되어 있습니다."
  ],
  stateStory: null,
  stateImgUrl : null,
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
    setStateCardsSeq: (state, action) => {
      state.stateCardsSeq = action.payload;
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
  },
  extraReducers: (builder) => {},
});

export const { setStateCategory, setStateMessage, setStateCards, setStateCardsSeq
,setStateResults, setStateStory, setStateImgUrl} = tarotSlice.actions;
export default tarotSlice.reducer;
