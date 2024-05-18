import db from "../models/database.js";
import express from "express";
import User from "../controllers/user.js";
import Prod from "../controllers/prod.js";
import user from "../models/users.js";
import { QueryTypes } from "sequelize";
import multer from "multer";
import path from "path";

const router = express.Router();
router.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to register a user
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.duration);
    const newUser = await User.createUser(db, req.body);
    if (newUser) {
      res.status(200).json({ message: "Successfully registered" });
    } else {
      res.status(500).json({ message: "Failed to insert data" });
    }
  } catch (err) {
    console.error("Error creating user data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to login a user
router.post("/login", async (req, res) => {
  try {
    console.log(req.body.password, req.body.username);
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Enter valid username and password" });
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
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    console.error("Error logging in user data:", err);
    res.status(500).json({ error: "Internal server error in login page" });
  }
});

// Route to create a product with multiple images
router.post('/prod_ins/:username', upload.array('images', 10), async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);
    const curUser = req.params.username;
    
    // Check user validity
    const userCheck = await Prod.userCheck(db, req.body.username, req.body.password, req.body.email);
    if (curUser === req.body.username && userCheck) {
      // Map uploaded files to their paths
      const imagePaths = req.files ? req.files.map(file => 'uploads/' + file.filename) : [];

      if (req.body.sale_type === 'direct') {
        delete req.body.duration;
      }
      
      // Create the product with the provided details including image paths
      const newProdData = {
        ...req.body,
        image_paths: imagePaths.join(', '), // Storing as comma-separated string
      };
      req.body.duration = req.body.duration || null;
      const newProd = await Prod.createProd(db, newProdData);
      
      if (newProd) {
        res.status(200).json({ message: "Successfully added product" });
      } else {
        res.status(500).json({ message: "Failed to insert product data" });
      }
    } else {
      res.status(401).json({ message: "Enter your username and password correctly" });
    }
  } catch (err) {
    console.error("Error creating product data:", err);
    res.status(500).json({ error: "Internal server error (product)" });
  }
});

// Route to get a user by username
router.get("/:username", async (req, res) => {
  try {
    console.log("user params:", req.params.username);
    const User = user(db.sequelize);
    const fetchedData = await db.sequelize.query(
      "SELECT * FROM users WHERE username = :username",
      {
        replacements: { username: req.params.username },
        type: QueryTypes.SELECT,
      }
    );
    console.log(fetchedData);

    if (!fetchedData || fetchedData.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(fetchedData[0]);
    }
  } catch (err) {
    console.error("Failed to fetch user data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to update a user by username
router.post("/userUpdate/:username", upload.array('images', 10), async (req, res) => {
  try {
    console.log("user-update details-", req.body);
    let updquery = "UPDATE users SET ";
    const updatedVal = [];
    const {
      email,
      password,
      firstname,
      lastname,
      address,
      address2,
      city,
      state,
      zipcode,
      contact,
    } = req.body;

    if (email) {
      updquery += "email=?,";
      updatedVal.push(email);
    }
    if (password) {
      updquery += "password=?,";
      updatedVal.push(password);
    }
    if (firstname) {
      updquery += " firstname = ?,";
      updatedVal.push(firstname);
    }
    if (lastname) {
      updquery += " lastname = ?,";
      updatedVal.push(lastname);
    }
    if (address) {
      updquery += " address = ?,";
      updatedVal.push(address);
    }
    if (address2) {
      updquery += " address2 = ?,";
      updatedVal.push(address2);
    }
    if (city) {
      updquery += " city = ?,";
      updatedVal.push(city);
    }
    if (state) {
      updquery += " state = ?,";
      updatedVal.push(state);
    }
    if (zipcode) {
      updquery += " zipcode= ?,";
      updatedVal.push(zipcode);
    }
    if (contact) {
      updquery += "contact = ?,";
      updatedVal.push(contact);
    }
    if (req.body.image_paths) {
      updquery += "image_paths = ?,";
      updatedVal.push(req.body.image_paths);
    }

    updquery += " updatedAt = NOW() ";
    updquery += " WHERE username = ?";
    updatedVal.push(req.params.username);

    await db.sequelize.query(updquery, {
      replacements: updatedVal,
      type: db.sequelize.QueryTypes.UPDATE,
    });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all products
router.get("/products/direct_prods", async (req, res) => {
  try {
    const allproductDetails = await Prod.getAllProductDetails(db);
    console.log(allproductDetails);

   if (!allproductDetails) {
     return res.status(404).json({ error: "Product not found" });
   }

   res.json(allproductDetails);
 } catch (error) {
   console.error("Error handling request:", error);
   res.status(500).json({ error: "Internal server error" });
 }
});

// Route to get auction products
router.get("/products/auction_prods", async (req, res) => {
  try {
    const aucproductDetails = await Prod.getAucProductDetails(db);
    console.log(aucproductDetails);

    if (!aucproductDetails) {
      return res.status(404).json({ error: "Product not found" });
    }

   res.json(aucproductDetails);
 } catch (error) {
   console.error("Error handling request:", error);
   res.status(500).json({ error: "Internal server error" });
 }
});

export default router;
