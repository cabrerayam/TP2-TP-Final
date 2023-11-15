import { Router } from "express";
import ProductoController from "../controller/ProductoController.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";

const peoductoRoutes = Router();
const productoController = new ProductoController();

peoductoRoutes.get("", productoController.getAllProductos);
peoductoRoutes.get("/:id", productoController.getProductoById);

peoductoRoutes.use(validateAdmin);
peoductoRoutes.post("/", productoController.createProducto);
peoductoRoutes.put("/:id", productoController.updateProducto);
peoductoRoutes.delete("/:id", productoController.deleteProducto);

export default peoductoRoutes;
