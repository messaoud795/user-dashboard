// const express = require("express");
import express from "express";
import {
  load_users,
  create_user,
  update_user,
  delete_user,
} from "../controllers/userController.js";

const router = express.Router();

//get all users
router.get("/", load_users);

//create a new user
router.post("/", create_user);

//update an user
router.put("/:uid", update_user);

//delete an user
router.delete("/:uid", delete_user);

export default router;
