import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class User extends Model {
}
User.init(
  {
    name: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isAlpha: {
          msg: "El Role solo puede contener letras.",
        },
        notIn: {
          args: [["null", "NULL"]],
          msg: "No se puede crear Role con valor nulo.",
        },
        len: {
          args: [3],
          msg: "Longitud mínima de Role es de 3 caracteres.",
        },
      },
    },
    email: {
      type: DT.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Formato de mail inválido.",
        },
        notEmpty: true,
        notNull: true,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    timestamps: false,
  }
);
export default User;
