import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  token: "",
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      axios.defaults.headers.common["Authorization"] = action.payload.token;
      localStorage.setItem("jwtToken", action.payload.token);
    },
    logout(state, action) {
      delete axios.defaults.headers.common["Authorization"];
      state.isLoggedIn = false;
      localStorage.removeItem("jwtToken");
    },
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice;
