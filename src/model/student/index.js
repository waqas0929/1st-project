import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const studentModel = sequelize.define(
  "studentModel",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

export default studentModel;
