import express from "express";
import router from "./routes/userRoute.js";
import cors from "cors";

//configuration
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", router);

app.listen(port, function () {
  console.log(`Bounce coding-challenge-backend running on port ${port}`);
});