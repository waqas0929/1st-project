import { Router } from "express";
import teacherController from "../../controller/teachers/index.js";

const teachersRouter = Router();

//get all teachers
teachersRouter.get("/teachers", teacherController.getAll);

//get student by id
teachersRouter.get("/teachers/:id", teacherController.getId);

//create student api
teachersRouter.post("/teachers", teacherController.create);

//update teachers details
teachersRouter.put("/teachers/:id", teacherController.update);

//delete student
teachersRouter.delete("/teachers/:id", teacherController.deleted);

export default teachersRouter;
