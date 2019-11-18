import {combineReducers} from "redux";
import auth from "./auth";
import initialSetup from "./initialSetup";

const rootReducer = combineReducers({
  auth, initialSetup
});

export default rootReducer;
