import { Router } from "express";
import roleRoutes from "./roleRoutes.js";
import userRoutes from "./userRoutes.js";
import productoRoutes from "./productoRoutes.js"
import pedidoRoutes from "./pedidoRoutes.js"

const router = Router();

router.use("/role", roleRoutes);
router.use("/user", userRoutes);
router.use("/producto", productoRoutes)
router.use("/pedido", pedidoRoutes)

export default router;
