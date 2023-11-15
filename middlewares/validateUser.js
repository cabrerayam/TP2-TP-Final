import { verifyToken } from "../utils/jwt.js";

export const validateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const user = verifyToken(token);

    if (!user) throw new Error("Acceso restringido.");
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ message: err });
  }
};

