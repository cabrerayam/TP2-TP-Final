import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Pedido extends Model {}
Pedido.init(
  {
    total: {
      type: DT.DOUBLE,
      allowNull: true,
      validations: {
        isFloat: {
          msg:"El total debe ser un numero flotante."
        }
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Pedido",
    timestamps: false,
  }
);

export default Pedido;