import { NotAuthorizedError } from "../common/errors";
import jwt from "jsonwebtoken";
import config from "../config";

export const decodeToken = (authorization: string) => {
  const [, token] = authorization?.split(" ") || "";
  if (!token) {
    throw new NotAuthorizedError();
  }
  return jwt.verify(token, config.jwtSecret);
};
