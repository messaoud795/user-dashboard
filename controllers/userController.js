import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const BOUNCE_API_ENDPOINT =
  "https://coding-challenge-api.bounceinsights.com/users";
const headersOptions = {
  Authorization: `Bearer ${process.env.BOUNCE_BEARER_TOKEN}`,
  "Content-Type": "application/json",
};

// get list of all users.
export const load_users = async (req, res) => {
  const response = await fetch(BOUNCE_API_ENDPOINT, {
    headers: headersOptions,
  });
  const users = await response.json();
  return res.status(200).send(users);
};

//create a new user
export const create_user = async (req, res) => {
  try {
    const newUser = req.body;
    const response = await fetch(BOUNCE_API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: headersOptions,
    });

    return res.status(201).send({ msg: "user is created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

//update a user
export const update_user = async (req, res) => {
  try {
    const id = req.params.uid;
    const newData = req.body;
    const response = await fetch(`${BOUNCE_API_ENDPOINT}/${id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: headersOptions,
    });
    return res.status(200).send({ msg: "user data updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

//delete a user
export const delete_user = async (req, res) => {
  try {
    const id = req.params.uid;
    const response = await fetch(`${BOUNCE_API_ENDPOINT}/${id}/`, {
      method: "DELETE",
      headers: headersOptions,
    });
    return res.status(200).send({ msg: "user data deleted Successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
};
