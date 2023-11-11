import { Router } from "express";
import UserCont from "../controller/UserController.js";
const userRoutes = Router();
const userController = new UserCont();

userRoutes.post("/", userController.createUser);
userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
