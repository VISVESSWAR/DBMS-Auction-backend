import { DataTypes, Sequelize } from "sequelize";
// import db from './database.js';

const Prods = (sequelize) => {
  const Prods = sequelize.define("Prods", {
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
   price:{
    type: DataTypes.BIGINT,
  },
    y_o_u:{
        type: DataTypes.BIGINT,
    },
    duration:{
        type: DataTypes.BIGINT,
    },
  });
  return Prods;
};
export default Prods;
