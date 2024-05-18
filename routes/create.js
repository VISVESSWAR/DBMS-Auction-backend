import db from "../models/database.js";
import express from "express";
import User from "../controllers/user.js";
import Prod from "../controllers/prod.js";
import user from "../models/users.js";
import { QueryTypes } from "sequelize";
import generateUniqueId from "generate-unique-id";

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
    if (curUser === req.body.username && userCheck) {
      const newProd = await Prod.createProd(db, req.body);
      console.log("correct user");
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

router.get("/products/direct_prods/:user", async (req, res) => {
   const  username  = req.params; // Change this line
  // console.log("Extracted username:", username);

  try {
    const allproductDetails = await Prod.getAllProductDetails(db,username);
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

router.get("/products/auction_prods/:user", async (req, res) => {
   const username  = req.params.user; // Change this line
  // console.log("Extracted username:", username);

  try {
    const aucproductDetails = await Prod.getAucProductDetails(db,username);
    console.log(aucproductDetails);

    if (!aucproductDetails) {
      return res.status(404).json({ error: "Products not found" });
    }

    res.json(aucproductDetails);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:pname", async (req, res) => {
  const prodname = req.params.pname;
  console.log("route:", prodname);
  try {
    const product = await Prod.viewProd(db, prodname);
    console.log("prod:", product[0]);
    if (product) {
      res.json(product[0]);
    } else {
      return res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    console.log("Error handling request to view the chosen product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create-order/:pname", async (req, res) => {
  const orderId = generateUniqueId({
    length: 10,
    useLetters: true,
    useNumbers: true,
  });

  const prodname = req.params.pname;
  const {buyer,seller}=req.body;

  const Price = await db.prods.sequelize.query(
    `SELECT price FROM Prods where prod_name='${prodname}';`
  );

  console.log("route:", prodname, " price:", Price[0][0].price);

  const orderDetails = {
    order_id: orderId,
    prod_name: prodname,
    buyername: buyer,
    sellername: seller,
    price: Price[0][0].price,
  };
  console.log("orderDetails:",orderDetails);

  try {
    const Order = await Prod.createOrder(db, orderDetails);
    console.log("order:",Order);
    if (Order) {
      res.json(Order);
    } else {
      return res.status(404).json({ error: "order unable to be created" });
    }
  } catch (error) {
    console.log("Error handling request to create the order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
