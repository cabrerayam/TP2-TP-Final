import { Role } from "../Models/index.js";

class RoleController {
  constructor() {}

  getAllRoles = async (req, res) => {
    try {
      const roles = await Role.findAll();
      res
        .status(200)
        .send({ success: true, message: "Todos los roles", data: roles });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getRoleById = async (req, res) => {
    try {
      const { id } = req.params;
      const role = await Role.findOne({
        where: { id },
        attributes: ["id", "name"]
      });

      if (!role) throw new Error(`No existe role con id: ${id}`);
      res
        .status(200)
        .send({ success: true, message: `Role: ${id}`, data: role });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createRole = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name.length > 0) throw new Error("No se puede crear role con nombre vacío.");

      const role = await Role.create({ name });
      if (!role) throw new Error("No se puede crear role.");
      res
        .status(200)
        .send({ success: true, message: `Role [${name}] creado`, data: role });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateRole = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const role = await Role.update(
        { name },
        {
          where: {
            id,
          },
        }
      );

      if (role[0] === 0) throw new Error(`Role ${id} inexistente o sin datos a modificar.`);

      res
        .status(200)
        .send({ success: true, message: `Role ${id} modificado`, data: role });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteRole = async (req, res) => {
    try {
       const { id } = req.params;
       const role = await Role.destroy({
         where: { id },
       });
      console.log(role)
       if (role === 0) throw new Error(`Role ${id} inexistente`);
       res
         .status(200)
         .send({ success: true, message: "Role eliminado", data: role });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message});
    }
  };
}

export default RoleController;
