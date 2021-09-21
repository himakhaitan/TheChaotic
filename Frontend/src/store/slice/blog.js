import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import variable from "../../config/variables";
// import { essentialAction } from "./essential";

let initialState = {
  byCategory: [],
  current: {},
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchByCategory(state, action) {
      const match = state.byCategory.find((element) => {
        return element.categoryID === action.payload.categoryID;
      });
      if (!match) {
        state.byCategory.push(action.payload);
      } else {
        alert(`Data Already Fetched for ${action.payload.categoryID}`);
      }
    },
  },
});

export const blogActions = blogSlice.actions;

export const fetchByCategory = (categoryID) => {
  return async (dispatch) => {
    const response = await axios.get(
      `${variable.serverURL}/blog/category/${categoryID}`
    );
    if (!response.data.success) {
      alert(response.data.message);
    } else {
      dispatch(
        blogActions.fetchByCategory({
          blogs: response.data.blogs,
          categoryID,
        })
      );
    }
  };
};

export default blogSlice;
