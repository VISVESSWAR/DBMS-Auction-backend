import { DataTypes, Model, Sequelize } from "sequelize";
// import db from './database.js';

const AucProd = (sequelize) => {
  const aucprods = sequelize.define("aucprods", {
    // Define your user model attributes here
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    order_id: {
      type: DataTypes.STRING(11),
      primaryKey: true,
    },
    prod_name: {
      type: DataTypes.STRING,
    },
    sellername: {
      type: DataTypes.STRING(25),
      references: {
        model: "users",
        key: "username",
      },
    },
    buyername: {
      type: DataTypes.STRING(25),
      references: {
        model: "users",
        key: "username",
      },
    },
    base_price: {
      type: DataTypes.FLOAT,
    },
    final_price: {
      type: DataTypes.FLOAT,
    },
    purchasedate: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    payment_status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  });
  return aucprods;
};
export default AucProd;