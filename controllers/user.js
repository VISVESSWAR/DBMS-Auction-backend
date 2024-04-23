class User {
  static async createUser(db, obj) {
    try {
      // console.log(db.users);
      console.log(obj);
      const newUser = await db.users.create(obj);
      return newUser;
    } catch (err) {
      console.log("Error creating a new user :", err);
      throw err;
    }
  }

  static async viewUsers(db, obj) {
    try {
      const users = await db.Sequelize.query(`SELECT * FROM users;`);
      return users[0];
    } catch (err) {
      console.error("Error fetching the users:", err);
      throw err;
    }
  }
}
export default User;
