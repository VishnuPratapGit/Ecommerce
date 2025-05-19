import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const reduxStore = configureStore({
  reducer: authReducer,
});

export default reduxStore;
