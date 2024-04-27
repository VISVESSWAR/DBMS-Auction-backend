import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import createRoute from "./routes/create.js";

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  console.log("home page loaded");
});
app.listen(port, () => {
  console.log("sucessful on port " + port);
});

app.use("/user", createRoute);
