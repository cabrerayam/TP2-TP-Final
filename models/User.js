
import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class User extends Model {
  // validatePassword = async (passwordTextoPlano) => {
  //   const validate = await bcrypt.compare(passwordTextoPlano, this.password);
  //   return validate;
  // };
  validatePassword = async (passwordTextoPlano) => {
    const validate = await bcrypt.hash(passwordTextoPlano, this.salt);
    return validate === this.password;
  };
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Pone un email",
        },
      },
    },
    salt: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

User.beforeCreate(async (user) => {
  // const hashPassword = await bcrypt.hash(user.password, 10);
  // user.password=hashPassword

  const salt = await bcrypt.genSalt();
  user.salt = salt;

  const hashPassword = await bcrypt.hash(user.password, salt);
  user.password = hashPassword;
});

export default User;
