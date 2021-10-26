import { configureStore } from "@reduxjs/toolkit";
import { commonReducer } from "./redux/reducers";

export const store = configureStore({
  reducer: {
    commonReducer,
  },
});
