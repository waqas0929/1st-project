import groupModel from "../model/many_to_many_models/groupsModel.js";
import userModel from "../model/many_to_many_models/usersModel.js";
import productModel from "../model/sale/product.js";
import salesModel from "../model/sale/index.js";
import salesProductModel from "../model/sale/salesProduct.js";
import studentModel from "../model/student/index.js";
import teacherModel from "../model/teacher/index.js";
// import sequelize from "./config.js";

const syncDB = async () => {
  await groupModel.sync({ alter: true, force: false });
  await userModel.sync({ alter: true, force: false });
  await productModel.sync({ alter: true, force: false });
  await salesModel.sync({ alter: true, force: false });
  await salesProductModel.sync({ alter: true, force: false });
  await studentModel.sync({ alter: true, force: false });
  await teacherModel.sync({ alter: true, force: false });
  // await sequelize.sync({force: true, alter: true})
};

// console.log("Student table created")

export default syncDB;
