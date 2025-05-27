import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  products: [],
};

export const categoryProductSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.status = true;
      state.products = action.payload;
    },
    removeProducts: (state) => {
      state.status = false;
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, removeProducts } = categoryProductSlice.actions;

export default categoryProductSlice.reducer;
