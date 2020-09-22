import { createAction } from "@reduxjs/toolkit";
import { GET_USERS_LIST } from "../constants/constants";

export const usersList = createAction(GET_USERS_LIST);
