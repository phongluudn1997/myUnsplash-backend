import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "./async-handler";
import { User } from "../schemas/user";
import { decodeToken } from "../helper/token.util";

const checkToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedData = await decodeToken(req.headers.authorization);
    const { userId } = <any>decodedData;
    req.currentUser = await User.findById(userId);
    next();
  }
);

export { checkToken };
