import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import createRoute from "./routes/create.js";
import router from './controllers/productController.js';



const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  console.log("home page loaded");
  res.send("Hello")
});
app.use('/api', router);
app.listen(port, () => {
  console.log("sucessful on port " + port);
});

app.use("/user", createRoute);
app.use('/uploads',express.static('./uploads'));