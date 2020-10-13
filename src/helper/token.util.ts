import jwt from "jsonwebtoken";

export interface TokenInterface {
  userId: string;
}

export const generateToken = async (
  payload: TokenInterface
): Promise<string> => {
  return await jwt.sign(payload, process.env.PRIVATE_KEY);
};

export const decodeToken = async (authorization: string) => {
  const token = authorization.split(" ")[1];
  return await jwt.verify(token, process.env.PRIVATE_KEY);
};
