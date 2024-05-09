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
  static async loginCheck(db, uname,pass) {
    try {
      const user = await db.users.findOne({ where: {username: uname} });
      if (!user) {
          return false;
      }
      console.log(user.password===pass);
      if (user.password === pass) {
        return { success: true, user: user };
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking login:', error);
      throw error;
    }
  }
//  static async getUserBiodata(req, res) {
//   try {
//     // Fetch user data from the database
//     const userData = await User.findByPk(req.userId); // Assuming req.userId contains the user's ID

//     if (!userData) {
//       res.status(404).json({ error: 'User not found' });
//     } else {
//       // Return the user's biodata
//       res.status(200).json(userData);
//     }
//   } catch (error) {
//     console.error('Error fetching user biodata:', error);
//     res.status(500).json({ error: 'Failed to fetch user biodata' });
//   }
// }

}
export default User;
