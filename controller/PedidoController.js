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
          
        if (!pedido) throw new Error(`No existe pedido ${id}`);
        res.status(200).send({
          success: true,
          message: `Pedido ${id} encontrado`,
          data: pedido,
        });
      } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
  };

  createPedido = async (req, res) => {
      try {
        const { total, userId, productos } = req.body;

        let pBuscado = true;
        for (let i = 0; i < productos.length; i++) {
          let productoId = productos[i].id;
          let productoBuscado = await Producto.findOne({
            where: { id: productoId },
          });
          if (!productoBuscado) {
            pBuscado = false;
            break;
          }
        }

        if (!pBuscado) throw new Error("No existe producto");

        if (!parseFloat(total)) throw new Error("El total del ticket debe ser un número.");

        const pedidoCreado = await Pedido.create({ total, userId });
        productos.map((p) => {
          const { id, pedidoProducto } = p;
          const { items_quantity } = pedidoProducto;
          if (!parseInt(items_quantity))
            throw new Error("La cantidad debe ser un número.");
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
            message: `Pedido generado`,
            data: pedidoCreado,
          });
      } catch (error) {
          res.status(400).send({ success: false, message: error.message });
    }
  };

  updatePedido = async (req, res) => {
      try {
        const { id } = req.params;
        const { total, userId, productos } = req.body;

        if (!parseFloat(total))
          throw new Error("El total del ticket debe ser un número.");
        console.log(id, total, userId);
        const pedidoBuscado = await Pedido.findOne({
            where: { id },
        });
        
        if (!pedidoBuscado) throw new Error(`No existe pedido ${id}`);
        
        let pBuscado = true;
        let pCantInt = true;
        for (let i = 0; i < productos.length; i++) { 
          let productoId = productos[i].id;
          let items_cant = productos[i].pedidoProducto.items_quantity;
          let productoBuscado = await Producto.findOne({
            where: { id: productoId },
          });
          if (!productoBuscado) {
            pBuscado = false;
            break;
          }

          if (!parseInt(items_cant)) { 
            pCantInt = false;
            break;
          }
        }

        if(!pBuscado) throw new Error("No existe producto")
        if (!pCantInt) throw new Error("La cantidad de productos debe ser un número mayor a 0.");

        const pedido = await Pedido.update(
          { total, userId },
          { where: { id } }
        );

        await PedidoProducto.destroy(
          { where: { PedidoId:id } }
        );

        productos.map(async (p) => {
          const { items_quantity } = p.pedidoProducto;
          const productoId = p.id;

          await PedidoProducto.create(
            {pedidoId: id, productoId, items_quantity}
          );
        });

        res.status(200).send({
          success: true,
          message: "Pedido modificado",
          data: "ok",
        });
      } catch (error) {
          res.status(400).send({ success: false, message: error.message });
    }
  };

  deletePedido = async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await Pedido.destroy({
        where: { id },
      });
      console.log(pedido);
      if (pedido === 0) throw new Error(`Pedido ${id} inexistente`);

      res
        .status(200)
        .send({ success: true, message: `Pedido ${id} eliminado`, data: pedido });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default PedidoController;
