import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  categories: {},
  isLoading: false,
};

const essentialSlice = createSlice({
  name: "essential",
  initialState,
  reducers: {
    toggleSpinner(state) {
      state.isLoading = !state.isLoading;
    },
    fetchCategories() {
      alert('Hello World!');
    },
  },
});
export const essentialAction = essentialSlice.actions;

export default essentialSlice;
