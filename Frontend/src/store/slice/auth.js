import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import variable from "../../config/variables";

let initialState = {};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login(state, action) {},
    logout(state, action) {},
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice;
