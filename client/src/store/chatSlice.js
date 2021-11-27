import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    pinState: false,
    isEditing: false,
  },
  reducers: {
    togglePinState(state, action) {
      state.pinState = action.payload.payload;
    },
    toggleEditState(state, action) {
      state.isEditing = action.payload.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
