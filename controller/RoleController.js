import { Role } from "../Models/index.js";

class RoleController {
  constructor() {}

  getAllRoles = async (req, res) => {
    try {
      const roles = await Role.findAll();
      res
        .status(200)
        .send({ success: true, message: "Todos los role", data: roles });
    } catch (err) {}
  };

  getRoleById = async (req, res) => {
    try {
    } catch (err) {}
  };

  createRole = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name.length > 0) throw new Error("No puede estar vacío");
      const role = await Role.create({ name });
      console.log(role);

      if (!role) throw new Error("no se puede crear");
      res.status(200).send({ success: true, message: "Role creado", role });
    } catch (err) {
      res.status(400).send({ success: false, message: err.message });
    }
  };

  updateRole = async (req, res) => {
    try {
    } catch (err) {}
  };

  deleteRole = async (req, res) => {
    try {
    } catch (err) {}
  };
}

export default RoleController;
