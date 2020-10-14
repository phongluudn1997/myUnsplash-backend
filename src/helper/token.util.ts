import jwt from "jsonwebtoken";
import config from "../config";

export const decodeToken = (authorization: string) => {
  const token = authorization.split(" ")[1];
  return jwt.verify(token, config.jwtSecret);
};
