import { Router } from "express";
import studentController from "../../controller/students/index.js";

const studentsRouter = Router();

//get all students
studentsRouter.get("/students", studentController.getAll);

//get student by id
studentsRouter.get("/students/:id", studentController.getId);

//create student api
studentsRouter.post("/students", studentController.create);

//update students details
studentsRouter.put("/students/:id", studentController.update);

//delete student
studentsRouter.delete("/students/:id", studentController.deleted);

export default studentsRouter;
