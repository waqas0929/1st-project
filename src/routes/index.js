import salesRouter from "./sale/index.js";
import userRouter from "./many_to_many_routes/usersRoutes.js";
import productRouter from "./product/index.js";
import studentRoutes from "./students/index.js";
import teacherRoutes from "./teachers/index.js";
import groupRouter from "./many_to_many_routes/groupsRoutes.js";

const allRoutes = [
  studentRoutes,
  teacherRoutes,
  salesRouter,
  productRouter,
  groupRouter,
  userRouter,
];

export default allRoutes;
