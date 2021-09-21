import { configureStore } from "@reduxjs/toolkit";
import essentialSlice from "./slice/essential";
import blogSlice from "./slice/blog";

const store = configureStore({
  reducer: {
    essential: essentialSlice.reducer,
    blog: blogSlice.reducer,
  },
});
export default store;
