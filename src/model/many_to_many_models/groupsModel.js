// group.js
import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const groupModel = sequelize.define("Group", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default groupModel;
