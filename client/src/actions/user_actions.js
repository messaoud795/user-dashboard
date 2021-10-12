import axios from "axios";
import {
  USER_ACTION_ERROR,
  USER_ACTION_START,
  USER_ADD_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_EDIT_SUCCESS,
  USER_LOAD_SUCCESS,
} from "./actionTypes";

import { toastr } from "react-redux-toastr";
import { parseISO } from "date-fns";

//add a user: reload users in case of success  or show an error message
export const addUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_ACTION_START });
      await axios.post("/api/users/", data);
      dispatch({ type: USER_ADD_SUCCESS });
      toastr.success("success", "User added successfully");
      dispatch(loadUsers());
    } catch (error) {
      dispatch({ type: USER_ACTION_ERROR, payload: error });
    }
  };
};
//load all users from the back end
export const loadUsers = () => {
  return async (dispatch) => {
    const testData1 = "c1fc4856-5c70-403f-bb6d-d67ec006468b";
    const testData2 = "0a8625b3-ca61-4d7b-9eb1-05dad7b0dd91";
    try {
      dispatch({ type: USER_ACTION_START });
      const { data } = await axios.get("/api/users/");
      //data created while testing api , to be excluded from final result
      let users = await data.users.filter(
        (user) => user.id !== testData1 && user.id !== testData2
      );
      //tansform the string to data type
      for (var i in users) {
        users[i].dateOfBirth = parseISO(users[i].dateOfBirth);
        users[i].registeredAt = parseISO(users[i].registeredAt);
      }
      dispatch({ type: USER_LOAD_SUCCESS, payload: users });
    } catch (error) {
      dispatch({ type: USER_ACTION_ERROR, payload: error });
    }
  };
};
//edit user data: reload actions in case of success  or show an error message
export const editUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_ACTION_START });
      await axios.put(`/api/users/${data.id}`, data);
      dispatch({ type: USER_EDIT_SUCCESS });
      toastr.success("Success", "User data updated successfully");
      dispatch(loadUsers());
    } catch (error) {
      dispatch({ type: USER_ACTION_ERROR, payload: error });
      toastr.error("Error", "Country data is not updated ");
    }
  };
};

//delete an action: reload actions in case of success  or show an error message
export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_ACTION_START });
      await axios.delete(`/api/users/${userId}`);
      dispatch({ type: USER_DELETE_SUCCESS });
      dispatch(loadUsers());
      toastr.info("Operation completed", "user data deleted ");
    } catch (error) {
      dispatch({ type: USER_ACTION_ERROR });
      toastr.info("Operation not completed", "user data not deleted ");
    }
  };
};
