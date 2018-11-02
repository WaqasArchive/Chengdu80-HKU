import issuerSignUp from "./issuerSignUp";
import notes from "./notes";
import {combineReducers} from "redux";

export default combineReducers({
  notes,
  issuerSignUp,
});
