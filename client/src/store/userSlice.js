import { createSlice } from "@reduxjs/toolkit";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
  },
  reducers: {
    userLogin(state, action) {
      switch (action.type) {
        case USER_LOGIN_REQUEST:
          state.loading = true;
          break;
        case USER_LOGIN_SUCCESS:
          state.loading = false;
          state.userInfo = action.payload;
          break;
        case USER_LOGIN_FAIL:
          state.loading = false;
          state.error = action.payload;
          break;
        case USER_LOGOUT:
          state.userInfo = null;
          break;
        default:
          state.loading = false;
          state.userInfo = null;
          state.error = null;
      }
    },
    userRegister(state, action) {
      switch (action.type) {
        case USER_REGISTER_REQUEST:
          state.loading = true;
          break;
        case USER_REGISTER_SUCCESS:
          state.loading = false;
          state.userInfo = action.payload;
          break;
        case USER_REGISTER_FAIL:
          state.loading = false;
          state.error = action.payload;
          break;
        default:
          state.loading = false;
          state.userInfo = {};
          state.error = "";
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
