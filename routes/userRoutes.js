import { Router } from "express";
import UserCont from "../controller/UserController.js";
import { validateUser } from "../middlewares/validateUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const userRoutes = Router();
const userController = new UserCont();

userRoutes.post("/login", userController.login);
userRoutes.post("/", userController.createUser);

userRoutes.use(validateUser);
userRoutes.get("/me", userController.me);

userRoutes.use(isAdmin);
userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
