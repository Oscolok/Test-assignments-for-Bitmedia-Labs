import { createReducer } from "@reduxjs/toolkit";
import { userInfo, userLogout } from "../actions/userAction";

export default createReducer("", {
  [userInfo]: (_, { payload }) => payload,
  [userLogout]: () => "",
});
