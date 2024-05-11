import express from 'express';
import Prod from '../models/Prods.js'; // Assuming 'Prod' represents your product model
// import {  Sequelize } from "sequelize";
import { QueryTypes } from 'sequelize';
import db from '../models/database.js';

const router = express.Router();

// Move getProductDetails outside the route handler
async function getProductDetails(username) {
  console.log(username)
  try {
    const productDetails = await db.prods.sequelize.query('SELECT * FROM Prods WHERE username = :username', {
      replacements: { username },
      type: QueryTypes.SELECT
    });
    if (productDetails) {
      console.log('Success fetching product details for:', username);
    } else {
      console.log('Failure: No product found for username:', username);
    }
    return productDetails;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
}

router.get('/products/:username', async (req, res) => {
  const { username } = req.params; // Change this line
  console.log("Extracted username:", username);

  try {
    const productDetails = await getProductDetails(username);

    if (!productDetails) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(productDetails);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
