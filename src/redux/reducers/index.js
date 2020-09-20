import { combineReducers } from "redux";
import scene from "./sceneReducer";

const rootReducer = combineReducers({
  scene,
});

export default rootReducer;
