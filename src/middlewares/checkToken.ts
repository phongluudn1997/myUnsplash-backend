import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "./async-handler";

const checkToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
    req.decoded = decoded;
    console.log(req.decoded);
    next();
  }
);

export { checkToken };
