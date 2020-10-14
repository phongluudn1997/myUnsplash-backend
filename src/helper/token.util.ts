import jwt from "jsonwebtoken";

export const decodeToken = (authorization: string) => {
  const token = authorization.split(" ")[1];
  return jwt.verify(token, process.env.PRIVATE_KEY);
};
