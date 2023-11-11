import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Pedido extends Model {}
Pedido.init(
  {
    items_quantity: {
      type: DT.INTEGER,
      allowNull: false,
    },
    total: {
      type: DT.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Pedido",
    timestamps: false,
  }
);

export default Pedido;