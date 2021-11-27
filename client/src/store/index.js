import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import pageSlice from "./pageSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    pageSlice: pageSlice.reducer,
    chatSlice: chatSlice.reducer,
  },
});

export default store;
