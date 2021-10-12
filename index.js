import express from "express";
import router from "./routes/userRoute.js";
import cors from "cors";
import path from "path";

//configuration
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res, next) => {
    let url = req.originalUrl;
    if (!url.startsWith("/api/")) {
      let __dirname = path.resolve(path.dirname(""));
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      return;
    }
    next();
  });
}

//routes
app.use("/api/users", router);

app.listen(port, function () {
  console.log(`Bounce coding-challenge-backend running on port ${port}`);
});
