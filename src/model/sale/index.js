import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const salesModel = sequelize.define(
  "sales",
  
  {
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },


);

export default salesModel;
