import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const teacherModel = sequelize.define(
  "teacherModel",
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

    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export default teacherModel;
