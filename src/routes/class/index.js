import { Router } from "express";

import classController from "../../controller/class/index.js";

const classRouter = Router();

classRouter.get("/class", classController.getAll);

classRouter.get("/class/:name", classController.getName)

classRouter.post("/class", classController.create)

classRouter.put("/class/:name", classController.update)

classRouter.delete("/class/:name", classController.deleted)

export default classRouter;
