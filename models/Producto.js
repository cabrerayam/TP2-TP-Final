import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Producto extends Model {}
Producto.init(
  {
    name: {
      type: DT.STRING,
      allowNull: false,
    },
  },

  {
    description: {
      type: DT.STRING,
      allowNull: true,
    },
  },

  {
    price: {
      type: DT.DOUBLE,
      allowNull: false,
    },
  },

  {
    sequelize: connection,
    modelName: "Producto",
  }
);

export default Producto;


