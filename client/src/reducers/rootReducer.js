import { reducer as toastrReducer } from "react-redux-toastr";
import { userReducer } from "./userReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  user: userReducer,
  toastr: toastrReducer,
});

export default rootReducer;
