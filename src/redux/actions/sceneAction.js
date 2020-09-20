import { createAction } from "@reduxjs/toolkit";
import { SCENE_TOGGLER } from "../constants/constants";

export const sceneToggle = createAction(SCENE_TOGGLER);
