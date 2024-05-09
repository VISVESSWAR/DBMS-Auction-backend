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
  }
  export default Prod;
  