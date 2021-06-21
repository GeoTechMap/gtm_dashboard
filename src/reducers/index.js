import { combineReducers } from "redux";
import changeState  from "./changeState";
// import books from "./books";
import essais  from "./essais";

export default combineReducers({
  changeState: changeState,
  essais: essais,
  // books,
});
