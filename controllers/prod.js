class Prod {
  static async createProd(db, obj) {
    try {
      console.log(obj);
      obj.curr_bid = obj.price;
      const newProd = await db.prods.create(obj);
      return newProd;
    } catch (err) {
      console.log("Error creating a new product:", err);
      throw err;
    }
  }

  static async viewProd(db, pid) {
    try {
      console.log("controller:", pid);
      const prods = await db.prods.sequelize.query(
        `SELECT * FROM Prods WHERE prod_id = '${pid}' AND sold_status = 'false';`
      );
      console.log("backend product:", prods[0]);
      return prods[0];
    } catch (err) {
      console.error("Error fetching the product:", err);
      throw err;
    }
  }

  static async userCheck(db, uname, pass, uemail) {
    try {
      const user = await db.users.findOne({ where: { username: uname } });
      if (!user) {
        return false;
      }
      if (user.password === pass && user.email === uemail) {
        return { success: true, user: user };
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking login:", error);
      throw error;
    }
  }

  static async getAllProductDetails(db, user) {
    try {
      const allProductDetails = await db.prods.sequelize.query(
        `SELECT * FROM Prods WHERE sale_type = 'direct' AND username != '${user.user}' AND sold_status = 'false';`
      );
      if (allProductDetails) {
        console.log("Success fetching all the product details.");
        return allProductDetails[0];
      } else {
        console.log("Failure: No product found.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }

  static async getAucProductDetails(db, user) {
    try {
      const aucProductDetails = await db.prods.sequelize.query(
        `SELECT * FROM Prods WHERE sale_type = 'auction' AND username != '${user}' AND sold_status = 'false';`
      );
      if (aucProductDetails) {
        console.log("Success fetching all the auction product details.");
        return aucProductDetails[0];
      } else {
        console.log("Failure: No product found.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching auction product details:", error);
      throw error;
    }
  }

  static async createOrder(db, orderDetails) {
    try {
      console.log("controller create order:", orderDetails);
      const st=orderDetails.saletype;
      const newOrder = await db.dirprods.create(orderDetails);
      console.log("backend order:", newOrder);
      return { newOrder, saletype: st };
    } catch (err) {
      console.error("Error creating the order:", err);
      throw err;
    }
  }

  static async createaucOrder(db, orderDetails) {
    try {
      console.log("controller auc create order:", orderDetails);
      const sta=orderDetails.saletype;
      const newOrder = await db.aucprods.create(orderDetails);
      console.log("backend order:", newOrder);
      return { newOrder, saletype: sta };
    } catch (err) {
      console.error("Error creating the order:", err);
      throw err;
    }
  }
}

export default Prod;
