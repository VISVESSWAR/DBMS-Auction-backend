import { DataTypes, Sequelize } from "sequelize";
// import db from './database.js';

const user = (sequelize) => {
  const users = sequelize.define("users", {
    // Define your user model attributes here
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },

    username: {
      type: DataTypes.STRING(25),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(20),
    },
    firstname: {
      type: DataTypes.STRING(50),
    },
    lastname: {
      type: DataTypes.STRING(50),
    },
    address: {
      type: DataTypes.STRING(100),
    },
    address2: {
      type: DataTypes.STRING(100),
    },
    city: {
      type: DataTypes.STRING(25),
    },
    state: {
      type: DataTypes.STRING(25),
    },
    zipcode: {
      type: DataTypes.BIGINT,
    },
    contact: {
      type: DataTypes.STRING,
    },
  });
  return users;
};
export default user;
