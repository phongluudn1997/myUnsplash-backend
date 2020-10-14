import jwt from "jsonwebtoken";

export const decodeToken = async (authorization: string) => {
  const token = authorization.split(" ")[1];
  return await jwt.verify(token, process.env.PRIVATE_KEY);
};
