import React, { useEffect } from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { loadUsers } from "../actions/user_actions";
import UsersTable from "../components/users/UsersTable";

export default function HomePage() {
  const { users, loadingAction } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //api request to get users from the back end
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  const columns = [
    { id: "name", label: "name" },
    { id: "gender", label: "gender" },
    { id: "dateOfBirth", label: "birth date" },
    { id: "registeredAt", label: "registered at" },
    { id: "surveys", label: "surveys" },
    { id: "email", label: "email" },
  ];

  return (
    <div className="homePage">
      <h1 className="home__title"> Users Dashboard</h1>
      {loadingAction ? (
        <CircularProgress className="homePage__spinner" />
      ) : (
        <UsersTable columns={columns} users={users} />
      )}
    </div>
  );
}
