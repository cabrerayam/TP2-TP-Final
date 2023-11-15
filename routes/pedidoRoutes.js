import { Router } from "express";
import PedidoController from "../controller/PedidoController.js";
import { validateUser } from "../middlewares/validateUser.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";

const pedidoRoutes = Router();
const pedidoController = new PedidoController();


pedidoRoutes.get("", validateAdmin, pedidoController.getAllPedidos);

pedidoRoutes.use(validateUser);
pedidoRoutes.get("/:id", pedidoController.getPedidoById);
pedidoRoutes.post("/", pedidoController.createPedido);
pedidoRoutes.put("/:id", pedidoController.updatePedido);
pedidoRoutes.delete("/:id", pedidoController.deletePedido);

export default pedidoRoutes;
