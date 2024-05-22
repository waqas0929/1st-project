// routes/groups.js
import express from "express";
import groupsController from "../../controller/many_to_many/groups.js";

const groupRouter = express.Router();

// CRUD routes
groupRouter.get("/groups", groupsController.getAllGroups);
groupRouter.post("/groups", groupsController.createGroup);
groupRouter.get("/groups/:id", groupsController.getGroupById);
groupRouter.put("/group/:id", groupsController.updateGroup);
groupRouter.delete("/group/:id", groupsController.deleteGroup);

export default groupRouter;
