import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Producto extends Model {}
Producto.init(
  {
    name: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        notNull: true,
        isAlpha: {
          msg: "El nombre solo puede contener letras.",
        },
        notIn: {
          args: [["null", "NULL"]],
          msg: "No se puede crear Producto con nombre nulo.",
        },
        len: {
          args: [3],
          msg: "Longitud mínima de nombre es de 3 caracteres.",
        },
      },
    },
    description: {
      type: DT.STRING,
      allowNull: true,
    },
    price: {
      type: DT.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Producto",
    timestamps: false,
  }
);

export default Producto;


