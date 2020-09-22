import { createReducer } from "@reduxjs/toolkit";
import { usersList } from "../actions/usersAction";

export default createReducer([], {
  [usersList]: (_, { payload }) => payload,
});
