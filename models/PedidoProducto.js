import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class PedidoProducto extends Model {}
PedidoProducto.init(
  {
    items_quantity: {
      type: DT.INTEGER,
      allowNull: false,
      validations: {
        min: {
          args: 1,
          msg: "Debe haber un mínimo de 1 producto.",
        },
        isInt: {
          msg: "Debe ser un número.",
        },
        isAlpha: false,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "PedidoProducto",
    timestamps: false,
  }
);

export default PedidoProducto;
