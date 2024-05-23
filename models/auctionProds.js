import { DataTypes, Model, Sequelize } from "sequelize";
// import db from './database.js';

const AucProd = (sequelize) => {
  const aucprods = sequelize.define("aucprods", {
    
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
    car_brand: {
      type: DataTypes.STRING,
    },
    car_model: {
      type: DataTypes.STRING,
    },
    prod_id: {
      type: DataTypes.STRING(255),
      references: {
        model: "prods",
        key: "prod_id",
      },
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