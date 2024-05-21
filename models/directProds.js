import { DataTypes, Model, Sequelize } from "sequelize";
import db from './database.js';

const DirProd = (sequelize) => {
  const dirprods = sequelize.define("dirprods", {
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
    car_brand: {
      type: DataTypes.STRING,
    },
    car_model: {
      type: DataTypes.STRING,
    },
    sellername: {
      type: DataTypes.STRING(25),
      allowNull: true,
      
      // references: {
      //   model: "users",
      //   key: "username",
      // },
    },
    buyername: {
      type: DataTypes.STRING(25),
      allowNull: true,
      // references: {
      //   model: "users",
      //   key: "username",
      // },
    },
    price: {
      type: DataTypes.BIGINT,
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
  return dirprods;
};
export default DirProd;