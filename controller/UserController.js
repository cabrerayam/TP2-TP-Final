import { User, Role } from "../Models/index.js";

class UserController {
  constructor() {}

  getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "name"],
        include: [{ model: Role }],
      });
      res
        .status(200)
        .send({ success: true, message: "Todos los usuarios", data: users });
    } catch (err) {
      res.status(400).send({ success: false, message: err.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id },
        attributes: ["id", "name"],
        include: [{ model: Role, attributes: ["name"] }],
      });

      if (!user) throw new Error("No existe usuario");
      res
        .status(200)
        .send({ success: true, message: "Todos los usuarios", data: user });
    } catch (err) {
      res.status(400).send({ success: false, message: err.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, email, roleId } = req.body;
      const user = await User.create({ name, email, roleId });
      if (!user) throw new Error("No se pudo crear usuario");

      res
        .status(200)
        .send({ success: true, message: "Usuario creado", data: user });
    } catch (err) {
      res.status(400).send({ success: false, message: err.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, roleId } = req.body;
      const user = await User.update(
        { name, email, roleId },
        {
          where: {
            id,
          },
        }
        );
        if (user[0] === 0) throw new Error("Usuario inexistente");
      res
        .status(200)
        .send({ success: true, message: "Usuario modificado", data: user });
    } catch (err) {
      res.status(400).send({ success: false, message: err.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.destroy({
        where: { id },
      });
      if(user === 0) throw new Error("Usuario inexistente")
      res
        .status(200)
        .send({ success: true, message: "Usuario eliminado", data: user });
    } catch (err) {
      res.status(400).send({ success: false, message: err.message });
    }
  };
}

export default UserController;
