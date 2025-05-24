import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  products: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.status = true;
      state.products = action.payload;
    },
    removeProducts: (state) => {
      state.status = false;
      state.products = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, removeProducts } = productSlice.actions;

export default productSlice.reducer;
