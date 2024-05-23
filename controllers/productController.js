import express from "express";
import Prod from "../models/Prods.js"; 
import db from "../models/database.js";
import { QueryTypes } from "sequelize";

const router = express.Router();


async function getProductDetails(username) {
  try {
    const productDetails = await db.sequelize.query(
      "SELECT * FROM Prods WHERE username = :username",
      {
        replacements: { username },
        type: QueryTypes.SELECT,
      }
    );
    return productDetails;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}


router.get("/products/:username", async (req, res) => {
  const { username } = req.params;
  console.log("Extracted username:", username);

  try {
    const productDetails = await getProductDetails(username);

    if (!productDetails) {
      return res.status(404).json({ error: "Product not found" });
    }

    else if( productDetails.length === 0)
      {
        return res.status(404).json({ error: "No products sold" });
    }

    res.json(productDetails);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
