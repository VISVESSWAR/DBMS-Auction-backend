import { DataTypes } from "sequelize";
import db from "./database.js"; 

const Prod = (sequelize) => {
  const Prods = sequelize.define("Prods", {
  
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    car_brand: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    car_model: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    prod_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
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
      allowNull: false,
    },
    // email: {
    //   type: DataTypes.STRING(50),
    //   allowNull: false,
    //   references: {
    //     model: "users",
    //     key: "email",
    //   },
    // },
    // password: {
    //   type: DataTypes.STRING(20),
    //   allowNull: false,
    // },
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
      type: DataTypes.INTEGER,
      allowNull:true,
      default:null,
    },
    offdoc_paths:
    {
      type:DataTypes.STRING,
    },
    sold_status: {
      type: DataTypes.STRING,
      defaultValue: 'false',
      allowNull: false,
    },
    curr_bid:{
      type:DataTypes.BIGINT,
      defaultValue:0,
    },
    highest_bidder:
    {
      type:DataTypes.STRING(25),
      allowNull: true,
      references: {
        model: "users",
        key: "username",
      },
    }
  });

  return Prods;
};

export default Prod;