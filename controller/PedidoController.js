import { Pedido, Producto, PedidoProducto } from "../Models/index.js";

class PedidoController {
  constructor() {}

  getAllPedidos = async (req, res) => {
      try {
          const pedido = await Pedido.findAll({
            include: [
              {
                model: Producto,
                attributes: ["id", "name", "description", "price"],
              },
            ],
          });
           res.status(200).send({
             success: true,
             message: "Todos los pedidos",
             data: pedido,
           });
      } catch (error) {
          res.status(400).send({ success: false, message: error.message });
    }
  };

  getPedidoById = async (req, res) => {
      try {
        const { id } = req.params;
        const pedido = await Pedido.findOne({
          where: { id },
          include: [
            {
              model: Producto,
              attributes: ["id", "name", "description", "price"],
            },
          ],
        });
          
        if (!pedido) throw new Error("No existe pedido");
        res.status(200).send({
          success: true,
          message: "Pedido by Id",
          data: pedido,
        });
    } catch (error) {}
  };

  createPedido = async (req, res) => {
      try {
        const { total, userId, productos } = req.body;
        const pedidoCreado = await Pedido.create({ total, userId });

        productos.map((p) => {
          const { id, pedidoProducto } = p;
          const { items_quantity } = pedidoProducto;

          pedidoCreado.addProducto(id, {
            through: {
              items_quantity,
            },
          });
        });

        res
          .status(200)
          .send({
            success: true,
            message: "Pedido generado",
            data: pedidoCreado,
          });
      } catch (error) {
          res.status(400).send({ success: false, message: error.message });
    }
  };

  updatePedido = async (req, res) => {
    try {
    } catch (err) {}
  };

  deletePedido = async (req, res) => {
    try {
    } catch (err) {}
  };
}

export default PedidoController;
