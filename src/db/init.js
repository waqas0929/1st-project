import studentModel from "../model/student/index.js";
import teacherModel from "../model/teacher/index.js";
// import sequelize from "./config.js";

const syncDB = async () => {
  await studentModel.sync({ alter: true });
  await teacherModel.sync({ alter: true });
  // await sequelize.sync({force: true, alter: true})
};

// console.log("Student table created")

export default syncDB;
