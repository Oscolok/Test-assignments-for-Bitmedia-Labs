import { createAction } from "@reduxjs/toolkit";
import { MODAL_OPEN, MODAL_CLOSE } from "../constants/constants";

export const modalOpen = createAction(MODAL_OPEN);
export const modalClose = createAction(MODAL_CLOSE);
