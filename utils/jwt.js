import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const token = jwt.sign(payload, "osvaldito", { expiresIn: "2d" });
  return token;
};

export const verifyToken = (token) => {
  const verify = jwt.verify(token, "osvaldito");
  return verify;
};
