import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sellingProductReducer from "./sellingProductsSlice";

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    sellingProduct: sellingProductReducer,
  },
});

export default reduxStore;
