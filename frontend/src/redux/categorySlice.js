import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  categories: [],
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.status = true;
      state.categories = action.payload;
    },
    removeCategories: (state) => {
      state.status = false;
      state.categories = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories, removeCategories } = categorySlice.actions;

export default categorySlice.reducer;
