import { configureStore } from "@reduxjs/toolkit";
// import additionalMiddleware from 'additional-middleware'
// import logger from 'redux-logger';
import navSlice from "@features/commonSlice/navSlice";
import loginSlice from "@features/commonSlice/loginSlice";
import memberSlice from "@features/memberSlice";
import chatSlice from "@/features/shootingStarSlice/chatSlice";
import tarotSlice from "@features/tarotSlice";
import messageListSlice from "@features/memberSlice";
import memberUpdateSlice from "@features/memberUpdateSlice";

export const store = configureStore({
  reducer: {
    // slice 삽입. slice의 name을 key값으로 사용
    loginCheck: loginSlice,
    navBars: navSlice,
    memberCheck: memberSlice,
    chat: chatSlice,
    tarot: tarotSlice,
    messageListCheck: messageListSlice,
    memberUpdate: memberUpdateSlice,
  },
  // saga 쓰면 여기에 추가
  // middleware: new MiddlewareArray().concat(additionalMiddleware, logger),
});
