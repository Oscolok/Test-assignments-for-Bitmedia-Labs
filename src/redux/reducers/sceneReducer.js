import { createReducer } from "@reduxjs/toolkit";
import { sceneToggle } from "../actions/sceneAction";

const initialState = "Start";

export default createReducer(initialState, {
  [sceneToggle]: (_, { payload }) => payload,
});
