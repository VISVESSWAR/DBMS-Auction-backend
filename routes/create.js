import db from "../models/database.js";
import express from "express";
import User from "../controllers/user.js";
//const user=require("../controllers/user.js");

const router = express.Router();
router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.createUser(db, req.body);
    if (newUser) {
      res.status(200).json({ message: "successfully registered" });
    } else {
      res.status(500).json({ message: "Failed to insert data" });
    }
  } catch (err) {
    console.error("Error creating user data:", err);
    res.status(500).json({ error: "Internal server error"});
  }
});

router.post('/login',async(req,res)=>{
  try {
    console.log(req.body.password,req.body.username);
    if(!req.body)
    {
      alert("enter valid username or password");
    }
    const newLogin = await User.loginCheck(db, req.body.username,req.body.password);
    console.log(newLogin);
    if (newLogin) {
      res.status(200).json({ message: "successfully login data entered" });
     
    } else {
      res.status(500).json({ message: "Failed to send login data" });
    }
  } catch (err) {
    console.error("Error logging in user data:", err);
    res.status(500).json({ error: "Internal server error in login page"});
  }

})
export default router;