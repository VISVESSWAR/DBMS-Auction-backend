import db from "../models/database.js";
import express from "express";
import User from "../controllers/user.js";
import Prod from "../controllers/prod.js";
import user from "../models/users.js";
import { QueryTypes } from "sequelize";
import multer from "multer";
import path from "path";
import generateUniqueId from "generate-unique-id";

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
    const newLogin = await User.loginCheck(db, req.body.username, req.body.password);
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

router.post('/prod_ins/:username', upload.array('images', 10), async (req, res) => {
  try {
    console.log(req.body);
    const curUser = req.params.username;

    const userCheck = await Prod.userCheck(db, req.body.username, req.body.password, req.body.email);
    if (curUser === req.body.username && userCheck) {
      const imagePaths = req.files ? req.files.map(file => 'uploads/' + file.filename) : [];

      if (req.body.sale_type === 'direct') {
        delete req.body.duration;
      }

      const newProdData = {
        ...req.body,
        image_paths: imagePaths.join(', '),
      };
      req.body.duration = req.body.duration || null;
      const newProd = await Prod.createProd(db, newProdData);

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
  const username = req.params.user;
  console.log("Extracted username:", username);

  try {
    const allproductDetails = await Prod.getAllProductDetails(db, username);
    const allproductDetails = await Prod.getAllProductDetails(db, username);
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
  const username = req.params.user;
  console.log("Extracted username:", username);

  try {
    const aucproductDetails = await Prod.getAucProductDetails(db, username);
    const aucproductDetails = await Prod.getAucProductDetails(db, username);
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
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log("Error handling request to view the chosen product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create-order/:pname", async (req, res) => {
  const orderId = generateUniqueId({
    length: 10,
    useNumbers: true,
  });

  const prodname = req.params.pname;
  const { buyer, seller } = req.body;

  // Fetch the curr_bid for the product
  const Price = await db.prods.sequelize.query(
    `SELECT curr_bid FROM Prods WHERE prod_name='${prodname}'`
  );

  // If the product is not found or does not have a curr_bid, handle the error
  if (!Price[0][0] || Price[0][0].curr_bid === null) {
    return res.status(404).json({ error: "Product not found or no current bid available" });
  }

  console.log("route:", prodname, " current bid:", Price[0][0].curr_bid);

  const orderDetails = {
    order_id: orderId,
    prod_name: prodname,
    buyername: buyer,
    sellername: seller,
    price: Price[0][0].curr_bid, // Use the curr_bid for the order price
  };
  console.log("orderDetails:", orderDetails);

  try {
    const Order = await Prod.createOrder(db, orderDetails);
    console.log("order:", Order);
    if (Order) {
      res.json(Order);
    } else {
      return res.status(404).json({ error: "Order unable to be created" });
    }
  } catch (error) {
    console.log("Error handling request to create the order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/direct-orders/:username", async (req, res) => {
  const buyername = req.params.username;
  console.log("Extracted buyername:", buyername);

  try {
    const allOrders = await Prod.getAllOrders(db, buyername);
    console.log(allOrders);

    if (!allOrders) {
      return res.status(404).json({ error: "Orders not found" });
    }

    res.json(allOrders);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/auc-orders/:username", async (req, res) => {
  const buyername = req.params.username;
  console.log("Extracted buyername:", buyername);

  try {
    const allAucOrders = await Prod.getAllAucOrders(db, buyername);
    console.log(allAucOrders);

    if (!allAucOrders) {
      return res.status(404).json({ error: "Auction orders not found" });
    }

    res.json(allAucOrders);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create-bid/:pname", async (req, res) => {
  const bidId = generateUniqueId({
    length: 10,
    useNumbers: true,
  });

  const prodname = req.params.pname;
  const { buyer, seller, bid_price } = req.body;

  const curPrice = await db.prods.sequelize.query(
    `SELECT price FROM Prods where prod_name='${prodname}'`
  );

  console.log("route:", prodname, " price:", curPrice[0][0].price);

  if (bid_price <= curPrice[0][0].price) {
    res.status(401).json({ message: "Bid price cannot be lesser than the current price" });
  } else {
    const bidDetails = {
      bid_id: bidId,
      prod_name: prodname,
      buyername: buyer,
      sellername: seller,
      price: bid_price,
    };
    console.log("bidDetails:", bidDetails);

    try {
      const Bid = await Prod.createBid(db, bidDetails);
      console.log("order:", Bid);
      if (Bid) {
        res.json(Bid);
      } else {
        return res.status(404).json({ error: "Order unable to be created" });
      }
    } catch (error) {
      console.log("Error handling request to create the order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.get("/bids/:username", async (req, res) => {
  const buyername = req.params.username;
  console.log("Extracted buyername:", buyername);

  try {
    const allBids = await Prod.getAllBids(db, buyername);
    console.log(allBids);

    if (!allBids) {
      return res.status(404).json({ error: "Orders not found" });
    }

    res.json(allBids);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/products/auction_prods/curr-bid', async (req, res) => {
  console.log(req.body);
  const { prodID, bid, user } = req.body;

  try {
    // Find the product by prodId
    const product = await db.sequelize.query(
      'SELECT * FROM prods WHERE prod_id = :prodID',
      {
        replacements: { prodID },
        type: QueryTypes.SELECT,
      }
    );

    if (!product || product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const foundProduct = product[0];

    // Check if the new bid is at least 10% higher than the current bid
    if (bid >= foundProduct.curr_bid * 1.1) {
      // Update the current bid and highest bidder
      const updateResult = await db.sequelize.query(
        'UPDATE prods SET curr_bid = :bid ,highest_bidder= :user WHERE prod_id = :prodID',
        {
          replacements: { prodID,user, bid},
          type: QueryTypes.UPDATE,
        }
      );

      if (updateResult[1] > 0) { // updateResult[1] contains the number of rows affected
        res.status(200).json({ message: 'Bid successfully placed' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } else {
      res.status(400).json({ message: 'Bid must be at least 10% higher than the current bid' });
    }
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;
