import { DataTypes, Model, Sequelize } from "sequelize";
// import db from './database.js';

const Prod = (sequelize) => {
  const prods = sequelize.define("Prods", {
    // Define your user model attributes here
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    prod_name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(25),
      references: {
        model: "users",
        key: "username",
      },
    },
    email: {
      type: DataTypes.STRING(50),
      references: {
        model: "users",
        key: "email",
        },
    },
    password: {
      type: DataTypes.STRING(20),
    },
    price: {
      type: DataTypes.BIGINT,
    },
    y_o_u: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    duration: {
      type: DataTypes.BIGINT,
    },
  });
  return prods;
};
export default Prod;
