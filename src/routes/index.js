import salesRouter from "./sale/index.js";
import productRouter from "./product/index.js";
import studentRoutes from "./students/index.js";
import teacherRoutes from "./teachers/index.js";

const allRoutes = [studentRoutes, teacherRoutes, salesRouter, productRouter];

export default allRoutes;
