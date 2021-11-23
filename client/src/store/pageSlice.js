import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "pageSlice",
  initialState: {
    page: "home",
  },
  reducers: {
    togglePage(state, action) {
      state.page = action.payload.payload;
    },
  },
});

export const pageActions = pageSlice.actions;
export default pageSlice;
