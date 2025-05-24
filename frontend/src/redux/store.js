import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryProductsReducer from "./categoryProducts";
import sellingProductReducer from "./sellingProductsSlice";
import productsReducer from "./productSlice";

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    sellingProduct: sellingProductReducer,
    categoryProducts: categoryProductsReducer,
  },
});

export default reduxStore;
