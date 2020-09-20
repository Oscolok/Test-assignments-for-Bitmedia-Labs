import { configureStore } from "@reduxjs/toolkit";
import rootReduces from "./reducers";

const store = configureStore({
  reducer: rootReduces,
});

export default store;
