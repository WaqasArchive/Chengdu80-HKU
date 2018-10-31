import counter from "./counter";
import notes from "./notes";
import {combineReducers} from "redux";

export default combineReducers({
  counter,
  notes,
});
