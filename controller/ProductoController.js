import { Producto } from "../Models/index.js";

class ProductoController {
  constructor() {}

  getAllProductos = async (req, res) => {
      try {
        const products = await Producto.findAll();
        res
          .status(200)
          .send({
            success: true,
            message: "Todos los productos",
            data: products,
          });
    } catch (error) {}
  };

  getProductoById = async (req, res) => {
    try {
    } catch (error) {}
  };

  createProducto = async (req, res) => {
      try {
        const { name, description, price } = req.body;
        const product = await Producto.create({ name, description, price });
        if (!product) throw new Error("No se pudo crear producto");
            
          res
            .status(200)
            .send({ success: true, message: "Producto creado", data: product });
      } catch (error) {
          res.status(400).send({ success: false, message: error.message });
    }
  };

  updateProducto = async (req, res) => {
    try {
    } catch (err) {}
  };

  deleteProducto = async (req, res) => {
    try {
    } catch (err) {}
  };
}

export default ProductoController;
