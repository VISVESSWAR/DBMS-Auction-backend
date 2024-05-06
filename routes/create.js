import db from "../models/database.js";
import express from "express";
import User from "../controllers/user.js";
import Prod from "../controllers/prod.js";
import user from "../models/users.js";

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
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body.password, req.body.username);
    if (!req.body) {
      alert("enter valid username or password");
    }
    const newLogin = await User.loginCheck(
      db,
      req.body.username,
      req.body.password
    );
    console.log(newLogin);
    if (newLogin) {
      res.status(200).json(req.body.username);
    } else {
      res.status(500).json({ message: "Failed to send login data" });
    }
  } catch (err) {
    console.error("Error logging in user data:", err);
    res.status(500).json({ error: "Internal server error in login page" });
  }
});

router.post("/prod_ins", async (req, res) => {
  try {
    console.log(req.body);
    const newProd = await Prod.createProd(db, req.body);
    if (newProd) {
      res.status(200).json({ message: "successfully added product" });
    } else {
      res.status(500).json({ message: "Failed to insert product data" });
    }
  } catch (err) {
    console.error("Error creating product data:", err);
    res.status(500).json({ error: "Internal server error (product)" });
  }
});

router.get("/:username", async (req, res) => {
  
  try {
    console.log("user params:",req.params.username);
    console.log("usermodel:"+user);
    const User=user(db.sequelize);
    const fetchedData = await User.findOne({
      where: { username: req.params.username },
    });
    if (!fetchedData) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.status(200).json(fetchedData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch user data" });
  }
});
// router.post("/users/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Fetch the user from the database by ID
//     const user = await User.findOne({ where: { id: userId } });

//     // Check if the user was found
//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//     } else {
//       // Return the user data
//       res.status(200).json(user);
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ error: "Failed to fetch user data" });
//   }
// });

// // Route to get user biodata
// router.get('?', User.getUserBiodata);

export default router;
