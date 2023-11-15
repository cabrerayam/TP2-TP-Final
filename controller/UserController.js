import { User, Role } from "../Models/index.js";
import { generateToken } from "../utils/jwt.js";


class UserController {
  constructor() {}

  getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email"],
        include: [{ model: Role, attributes: ["name"] }],
      });
      res
        .status(200)
        .send({ success: true, message: "Todos los usuarios", data: users });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id },
        attributes: ["id", "name", "email"],
        include: [{ model: Role, attributes: ["name"] }],
      });

      if (!user) throw new Error(`No existe usuario con id ${id}`);
      res
        .status(200)
        .send({ success: true, message: "Usuario encontrado", data: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, email, roleId, password } = req.body;
      const user = await User.create({ name, email, roleId, password });
      if (!user) throw new Error("No se pudo crear usuario");

      res
        .status(200)
        .send({ success: true, message: "Usuario creado", data: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, roleId, password } = req.body;
      const user = await User.update(
        { name, email, roleId, password },
        {
          where: {
            id,
          },
        }
      );
      if (user[0] === 0)
        throw new Error(`Usuario ${id} inexistente o sin datos a modificar.`);
      res.status(200).send({
        success: true,
        message: `Usuario ${id} modificado`,
        data: user,
      });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.destroy({
        where: { id },
      });
      if (user === 0) throw new Error(`Usuario ${id} inexistente`);
      res
        .status(200)
        .send({ success: true, message: "Usuario eliminado", data: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
        include: [{ model: Role, attributes: ["name"] }],
      });

      if (!user) throw new Error("No existe usuario");

      const validate = await user.validatePassword(password);
      if (!validate) throw new Error("No permitido.");
      
      const payload = {
        id: user.id,
        role: user.Role.dataValues.name,
      };
      const token = generateToken(payload);
      res
        .cookie("token", token)
        .status(200)
        .send({ success: true, message: "Usuario loggeado"});
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  me = async (req, res) => {
    try {
      // Middleware
      // const { token } = req.cookies;
      // const user = verifyToken(token)
      // console.log(user);
      const { user } = req;
      res.status(200).send({ success: true, message: "Todos ok", data: user });
    } catch (err) {
      res.status(400).send({ success: false, message: err.message });
    }
  };
}

export default UserController;
