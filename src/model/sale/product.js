import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const productModel = sequelize.define(
  "products",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }
  // {}
);

export default productModel;
