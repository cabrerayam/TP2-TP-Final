import { verifyToken } from "../utils/jwt.js";

export const validateAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const admin = verifyToken(token);

    console.log(admin.role)
    if (admin.role !== "Admin") throw new Error("No permitido para usuarios no administradores.");
    next();
  } catch (err) {
    res.status(401).send({ message: err });
  }
};

