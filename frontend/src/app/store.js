import { configureStore } from "@reduxjs/toolkit";
// import additionalMiddleware from 'additional-middleware'
// import logger from 'redux-logger';
import navSlice from "@features/commonSlice/navSlice";
import loginSlice from "@features/commonSlice/loginSlice";
import memberSlice from "@features/memberSlice";

export const store = configureStore({
  reducer: {
    // slice 삽입. slice의 name을 key값으로 사용
    loginCheck: loginSlice,
    navBars: navSlice,
    memberCheck: memberSlice,
  },
  // saga 쓰면 여기에 추가
  // middleware: new MiddlewareArray().concat(additionalMiddleware, logger),
});