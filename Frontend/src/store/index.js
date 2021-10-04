import { configureStore } from "@reduxjs/toolkit";
import essentialSlice from "./slice/essential";
import blogSlice from "./slice/blog";
import authSlice from "./slice/auth";

const store = configureStore({
  reducer: {
    essential: essentialSlice.reducer,
    blog: blogSlice.reducer,
    auth: authSlice.reducer,
  },
});
export default store;
