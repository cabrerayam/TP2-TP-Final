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
        notNull:true,
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
