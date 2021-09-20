import { configureStore } from "@reduxjs/toolkit";
import essentialSlice from "./slice/essential";

const store = configureStore({
  reducer: {
    essential: essentialSlice.reducer,
  },
});
export default store;
