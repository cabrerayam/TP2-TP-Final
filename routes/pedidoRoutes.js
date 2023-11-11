import { Router } from "express";
import PedidoController from "../controller/PedidoController.js";
const pedidoRoutes = Router();
const pedidoController = new PedidoController();

pedidoRoutes.get("", pedidoController.getAllPedidos);
pedidoRoutes.get("/:id", pedidoController.getPedidoById);
pedidoRoutes.post("/", pedidoController.createPedido);
pedidoRoutes.put("/:id", pedidoController.updatePedido);
pedidoRoutes.delete("/:id", pedidoController.deletePedido);

export default pedidoRoutes;
