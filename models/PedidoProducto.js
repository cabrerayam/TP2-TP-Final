import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class PedidoProducto extends Model {}
PedidoProducto.init(
  {
    items_quantity: {
      type: DT.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "PedidoProducto",
    timestamps: false,
  }
);

export default PedidoProducto;
