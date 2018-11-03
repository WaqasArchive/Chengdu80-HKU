import IPO from "./IPO";
import notes from "./notes";
import users from "./users";
import {combineReducers} from "redux";

export default combineReducers({
  notes,
  users,
  IPO,
});
