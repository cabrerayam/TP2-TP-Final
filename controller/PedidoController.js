import { Pedido, Producto, PedidoProducto } from "../Models/index.js";

class PedidoController {
  constructor() {}

  getAllPedidos = async (req, res) => {
      try {
          const result = await Pedido.findAll({
            include: [
              {
                model: Producto,
                attributes: ["id", "name", "description", "price"],
              }
              
            ],
          });
           res.status(200).send({
             success: true,
             message: "Todos los pedidos",
             data: result,
           });
      } catch (error) {
          res.status(400).send({ success: false, message: error.message });
    }
  };

  getPedidoById = async (req, res) => {
    try {
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

        //   console.log("prod", prod);
        //   console.log("pedidoProducto", pedidoProducto.items_quantity);
        //   pedidoCreado.addProducto(prod, {
        //     through: {
        //       items_quantity: pedidoProducto.items_quantity,
        //     },
        //   });

        res
          .status(200)
          .send({ success: true, message: "Pedido generado", data: "ok" });
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