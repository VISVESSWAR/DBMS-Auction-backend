import db from "../models/database.js";
import express from "express";
import User from "../controllers/user.js";
import Prod from "../controllers/prod.js";
import user from "../models/users.js";
import { QueryTypes } from "sequelize";

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

router.post("/prod_ins/:username", async (req, res) => {
  try {
    console.log(req.body);
    const curUser = req.params.username;
    const userCheck = await Prod.userCheck(
      db,
      req.body.username,
      req.body.password,
      req.body.email
    );
    const newProd = await Prod.createProd(db, req.body);
    if (curUser === req.body.username && userCheck) {
      if (newProd) {
        res.status(200).json({ message: "successfully added product" });
      } else {
        res.status(500).json({ message: "Failed to insert product data" });
      }
    } else {
      res.status(501).json({ message: "enter your user name and password" });
    }
  } catch (err) {
    console.error("Error creating product data:", err);
    res.status(500).json({ error: "Internal server error (product)" });
  }
});

router.get("/:username", async (req, res) => {
  try {
    console.log("user params:", req.params.username);
    console.log("usermodel:" + user);
    const User = user(db.sequelize);
    // const fetchedData = await User.findOne({
    //   where: { username: req.params.username },
    // });
    const fetchedData = await db.sequelize.query(
      "SELECT * FROM users WHERE username = :username",
      {
        replacements: { username: req.params.username },
        type: QueryTypes.SELECT,
      }
    );
    console.log(fetchedData);

    if (!fetchedData) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.status(200).json(fetchedData[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch user data" });
  }
});
router.post("/userUpdate/:username", async (req, res) => {
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
    updquery += " updatedAt = NOW(),";
    updquery = updquery.slice(0, -1) + " WHERE username = ?";
    updatedVal.push(req.params.username);

    // const query = `
    //   UPDATE users
    //   SET email = :email, password = :password, firstname = :firstname, lastname = :lastname,
    //       address = :address, address2 = :address2, city = :city, state = :state, zipcode = :zipcode, contact = :contact
    //   WHERE username = :username
    // `;
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

export default router;
