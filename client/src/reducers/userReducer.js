import {
  USER_ACTION_ERROR,
  USER_ACTION_START,
  USER_ADD_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_EDIT_SUCCESS,
  USER_LOAD_SUCCESS,
} from "../actions/actionTypes";

// 3 states of promise :pending for loadingAction before getting response from server,
// fulfilled which set actions with data received , rejected which launch an error
const initialState = {
  users: [],
  loadingAction: false,
  error: null,
};
export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_START:
      return (state = { ...state, loadingAction: true });
    case USER_LOAD_SUCCESS:
      return (state = {
        ...state,
        loadingAction: false,
        error: null,
        users: payload,
      });
    case USER_ADD_SUCCESS:
      return (state = { ...state, loadingAction: false, error: null });
    case USER_DELETE_SUCCESS:
      return (state = { ...state, loadingAction: false, error: null });
    case USER_EDIT_SUCCESS:
      return (state = { ...state, loadingAction: false, error: null });
    case USER_ACTION_ERROR:
      return (state = { ...state, loadingAction: false, error: payload });
    default:
      return state;
  }
};
