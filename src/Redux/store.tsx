import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./mode";
const store = configureStore({
  reducer: {
    modeReducer,
  },
});

export default store;
