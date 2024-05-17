const express = require('express');
const router = express.Router();
const db= require('../models/database');
const Order=require('../controller/order');


router.use(express.json())
router.post('/create-order/:id', async (req, res) => {
   
  
  try {
    const customerId = req.params.id;
        console.log(req.body);
        req.body.customer_id = customerId;
    result= await Order.createOrder(db,req.body);
    console.log('res',result);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(403).json({ "error": "error creating order" });
    }
} 
catch (error) {
    
    console.error('Error creating product : ', error);
    res.status(500).json({ "error": "Internal server error " });
}

});

router.post('/update-order/:id', async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        console.log(req.body);
        req.body.order_id = orderId;
        result= await Order.updateOrder(db,req.body);
        if(result)
        {
            res.status(200).json({"message": "payment statud updated"});
  
        }else{
            res.status(403).json({"message": "error on paying"});
        }
    } catch (error) {
        console.error('server Error :', error);
        res.status(500).json({ "error": 'server error' });
    }
  });


  router.post('/list/:id', async (req, res) => {
    try {
       const result= await Order.listOrder(db,req.params.id);
        
        if (!result) {
            res.status(200).json({ "message": "No orders placed yet" });
        } else {
            res.status(200).json(result);                   }
        
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({" error": 'Failed to fetch products' });
    }
});

router.post('/order-items/:id', async (req, res) => {
    try {
       const result= await Order.listOrderItem(db,parseInt(req.params.id));
        
        if (!result) {
            res.status(403).json({ "error": "No Product to show" });
        } else {
            res.status(200).json(result);                   }
        
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({" error": 'Failed to fetch products' });
    }
});

/*
router.post('/cartlist/:id', async (req, res) => {
    try {
        console.log(req.params.id);
       const result= await Order.CartList(db,req.params.id);
        
        if (!result) {
            res.status(200).json({ "message": "No orders placed yet" });
        } else {
            res.status(200).json(result);                   }
        
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({" error": 'Failed to fetch products' });
    }
});*/

  


module.exports = router

