import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SalesModel from "./index.js";
import productModel from "./product.js";

const saleProductModel = sequelize.define(
  "saleProduct",
  {
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productRate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }
);

SalesModel.hasMany(saleProductModel);
saleProductModel.belongsTo(SalesModel);

productModel.hasMany(saleProductModel);
saleProductModel.belongsTo(productModel);

export default saleProductModel;
