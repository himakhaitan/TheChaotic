import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import variable from "../../config/variables";

let initialState = {
  categories: [],
  isLoading: false,
};

const essentialSlice = createSlice({
  name: "essential",
  initialState,
  reducers: {
    toggleSpinner(state) {
      state.isLoading = !state.isLoading;
    },
    fetchCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const essentialAction = essentialSlice.actions;

export const updateCategories = () => {
  return async (dispatch) => {
    dispatch(essentialAction.toggleSpinner());
    const response = await axios.get(
      `${variable.serverURL}/assist/category/all`
    );
    if (!response.data.success) {
      alert(response.data.message);
    } else {
      dispatch(
        essentialAction.fetchCategories(
          response.data.categories.map((item) => {
            return {
              count: item.count,
              href: `/category/${item.name}`,
              item: item.name,
            };
          })
        )
      );
      dispatch(essentialAction.toggleSpinner());
    }
  };
};

export default essentialSlice;
