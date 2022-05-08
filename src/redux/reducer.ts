import { combineReducers, createStore } from "redux";
import tokenState from "./token";
import userState from "./user";
import courseState from "./course";
import historyState from "./history";
const rootReducer = combineReducers({
  tokenState,
  userState,
  courseState,
  historyState
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

export const store = createStore(rootReducer);
