import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Role extends Model {}
Role.init(
  {
    name: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
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
          args: [3,],
          msg:"Longitud mínima de Role es de 3 caracteres."
        }
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Role",
    timestamps: false,
  }
);

export default Role;
