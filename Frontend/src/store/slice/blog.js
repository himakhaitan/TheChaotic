import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import variable from "../../config/variables";
import { essentialAction } from "./essential";
// import { essentialAction } from "./essential";

let initialState = {
  byCategory: [],
  current: {},
  home: [],
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
    fetchHome(state, action) {
      state.home = action.payload;
    },
  },
});

export const blogActions = blogSlice.actions;

export const fetchHome = () => {
  return async (dispatch) => {
    dispatch(essentialAction.toggleSpinner());
    const response = await axios.get(`${variable.serverURL}/blog/home`);
    if (!response.data.success) {
      alert(response.data.message);
    } else {
      dispatch(blogActions.fetchHome(response.data.blogs));
    }
    dispatch(essentialAction.toggleSpinner());
  };
};

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
