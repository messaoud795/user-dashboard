import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const configureStore = () => {
  //thunk middelware for async actions
  const middlewares = [thunk];
  const conposedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, conposedEnhancer);

  return store;
};
