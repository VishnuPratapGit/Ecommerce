import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryProductsReducer from "./categoryProducts";
import sellingProductReducer from "./sellingProductsSlice";
import productsReducer from "./productSlice";
import categoriesReducer from "./categorySlice";

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    sellingProduct: sellingProductReducer,
    categoryProducts: categoryProductsReducer,
    categories: categoriesReducer,
  },
});

export default reduxStore;
