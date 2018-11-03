import issuerSignUp from "./issuerSignUp";
import notes from "./notes";
import users from "./users";
import {combineReducers} from "redux";

export default combineReducers({
  notes,
  users,
  issuerSignUp,
});
