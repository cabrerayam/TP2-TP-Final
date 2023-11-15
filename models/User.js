import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class User extends Model {
  validatePassword = async (passwordTextoPlano) => {
    const validate = await bcrypt.compare(passwordTextoPlano, this.password);
    return validate;
    //Si yo utilizo este método no necesito la salt.
  };
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
          msg: "El nombre solo puede contener letras.",
        },
        notIn: {
          args: [["null", "NULL"]],
          msg: "No se puede crear User con nombre nulo.",
        },
        len: {
          args: [3],
          msg: "Longitud mínima de nombre es de 3 caracteres.",
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
    salt: {
      type: DT.STRING,
    },
    password: {
      type: DT.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    timestamps: false,
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt();
  user.salt = salt;
  const hashPassword = await bcrypt.hash(user.password, salt);
  user.password = hashPassword;
});
export default User;
