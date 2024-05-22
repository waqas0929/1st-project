// user.js
import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import groupModel from "../../model/many_to_many_models/groupsModel.js";


const userModel = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //   email: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //     unique: true
  //   },
  // Add more fields as needed
});

userModel.belongsToMany(groupModel, { through: "groupUser" });
groupModel.belongsToMany(userModel, { through: "groupUser" });

export default userModel;
