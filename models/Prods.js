import { DataTypes } from "sequelize";
import db from "./database.js"; // Ensure to import your Sequelize instance correctly

const Prod = (sequelize) => {
  const Prods = sequelize.define("Prods", {
    // Define your product model attributes here
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    prod_name: {
      type: DataTypes.STRING(30),
      primaryKey:true,
      allowNull: false,
    },
    // prod_id: {
    //   type: DataTypes.STRING(255),
    //   primaryKey: true,
    // },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      references: {
        model: "users",
        key: "username",
      },
    },

    image_paths: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "users",
        key: "email",
      },
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    y_o_u: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    sale_type: {
      type: DataTypes.STRING(15),
      defaultValue: "direct",
      allowNull: false,
    },
    duration: {
      type: DataTypes.BIGINT,
      allowNull:true,
      default:null,
    },
    sold_status: {
      type: DataTypes.STRING,
      defaultValue: 'false',
      allowNull: false,
    }
  });

  return Prods;
};

export default Prod;
