// routes/users.js
import express from "express";
import usersController from "../../controller/many_to_many/users.js";

const userRouter = express.Router();

// CRUD routes
userRouter.get("/users", usersController.getAllUsers);
userRouter.post("/user", usersController.createUser);
// userRouter.get("/user/:id", usersController.getUserById);
userRouter.put("/user/:id", usersController.updateUser);
userRouter.delete("/user/:id", usersController.deleteUser);

export default userRouter;
