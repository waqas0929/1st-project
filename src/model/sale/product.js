import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const productModel = sequelize.define(
  "products",
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productRate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }
  // {}
);

export default productModel;
