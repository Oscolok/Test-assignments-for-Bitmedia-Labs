import { createAction } from "@reduxjs/toolkit";
import { USER_INFO, USER_LOGOUT } from "../constants/constants";

export const userInfo = createAction(USER_INFO);
export const userLogout = createAction(USER_LOGOUT);
