import dbConfig from "./config.js";
import users from "./users.js";
import prods from "./Prods.js";
import dirprods from "./directProds.js";
import aucprods from "./auctionProds.js";
import Sequelize from "sequelize";
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
 
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = users(sequelize);
db.prods = prods(sequelize);
db.dirprods = dirprods(sequelize);
db.aucprods= aucprods(sequelize);

sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("database connected 😀 ");
});
export default db;