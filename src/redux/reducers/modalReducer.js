import { createReducer } from "@reduxjs/toolkit";
import { modalOpen, modalClose } from "../actions/modalAction";

const initialState = "closed";

export default createReducer(initialState, {
  [modalOpen]: (_, { payload }) => payload,
  [modalClose]: () => "closed",
});
