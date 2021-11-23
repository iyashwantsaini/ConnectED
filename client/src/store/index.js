import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import pageSlice from "./pageSlice";

const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    pageSlice: pageSlice.reducer,
  },
});

export default store;
