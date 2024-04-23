import dbConfig from "./config.js";
 import users from "./users.js";
import Sequelize  from "sequelize";
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  operationsAliases: false,
  port: 3306,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  // define: {
  //   timestamps: true, // Set timestamps to true to automatically manage createdAt and updatedAt columns
  //   createdAt: 'created_at', // Set the createdAt column name to 'created_at'
  //   updatedAt: 'updated_at', // Set the updatedAt column name to 'updated_at'
  // },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize=sequelize;

db.users=users(sequelize);


sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("database connected 😀 ");
});
export default db;
