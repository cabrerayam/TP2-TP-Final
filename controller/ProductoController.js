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
      } catch (error) {
          res.status(400).send({ success: false, message: error.message });
    }
  };

  getProductoById = async (req, res) => {
      try {
        const { id } = req.params;
        const producto = await Producto.findOne({
          where: { id }
        });

        if (!producto) throw new Error(`No existe producto con id ${id}`);
        res
          .status(200)
          .send({ success: true, message: "Producto encontrado", data: producto });
      } catch (error) {
          res.status(400).send({ success: false, message: error.message });
    }
  };

  createProducto = async (req, res) => {
      try {
        const { name, description, price } = req.body;
        if(!parseFloat(price)) throw new Error("El precio debe ser un número");
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
      const { id } = req.params;
      const { name, description, price } = req.body;
      if (!parseFloat(price)) throw new Error("El precio debe ser un número");
      const product = await Producto.update(
        { name, description, price },
        {
          where: {
            id,
          },
        }
      );

      if (product[0] === 0) throw new Error(`Producto ${id} inexistente o sin datos a modificar.`);

      res
        .status(200)
        .send({ success: true, message: `Producto ${id} modificado`, data: product });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteProducto = async (req, res) => {
    try {
       const { id } = req.params;
       const producto = await Producto.destroy({
         where: { id },
       });
       if (producto === 0) throw new Error(`Producto ${id} inexistente`);
       res
         .status(200)
         .send({ success: true, message: `Producto ${id} eliminado`, data: producto });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default ProductoController;
