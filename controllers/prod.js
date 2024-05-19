class Prod {
  static async createProd(db, obj) {
    try {
      // console.log(db.users);
      console.log(obj);
      const newProd = await db.prods.create(obj);
      return newProd;
    } catch (err) {
      console.log("Error creating a new prod :", err);
      throw err;
    }
  }

  static async viewProd(db, pname) {
    try {
      console.log("controller:", pname);
      const Prods = await db.prods.sequelize.query(
        `SELECT * FROM Prods where prod_name='${pname}' and sold_status='false';`
      );
      console.log("backend Prod:", Prods[0]);
      return Prods[0];
    } catch (err) {
      console.error("Error fetching the Prod:", err);
      throw err;
    }
  }

  static async userCheck(db, uname, pass, uemail) {
    try {
      const user = await db.users.findOne({ where: { username: uname } });
      if (!user) {
        return false;
      }
      console.log(user.password === pass);
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
      console.log(user);
      const AllproductDetails = await db.prods.sequelize.query(
        `SELECT * FROM Prods WHERE sale_type='direct' and username!='${user.user}' and sold_status='false'`
      );
      if (AllproductDetails) {
        console.log("Success fetching all the product details ");
        console.log(AllproductDetails);
      } else {
        console.log("Failure: No product found ");
      }
      return AllproductDetails[0];
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }
  static async getAucProductDetails(db, user) {
    try {
      console.log(user);
      const AucproductDetails = await db.prods.sequelize.query(
        `SELECT * FROM Prods WHERE sale_type='auction' and username!='${user}' and sold_status='false'`
      );
      if (AucproductDetails) {
        console.log("Success fetching all the product details ");
        console.log(AucproductDetails);
      } else {
        console.log("Failure: No product found ");
      }
      return AucproductDetails[0];
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }

  static async createOrder(db, orderDetails) {
    try {
      console.log("controller create order:", orderDetails);
      const newOrder = await db.dirprods.create(orderDetails);
      console.log("backend Prod:", newOrder);
      return newOrder;
    } catch (err) {
      console.error("Error creating the order:", err);
      throw err;
    }
  }
}

export default Prod;
