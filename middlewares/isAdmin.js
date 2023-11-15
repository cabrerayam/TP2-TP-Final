import { verifyToken } from "../utils/jwt.js";

export const isAdmin = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== "Admin") throw new Error("No permitido para usuarios no administradores.");
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
