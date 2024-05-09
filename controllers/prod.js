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

  static async viewProd(db, obj) {
    try {
      const Prods = await db.Sequelize.query(`SELECT * FROM Prods;`);
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
}

export default Prod;
