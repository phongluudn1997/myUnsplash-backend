import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "./async-handler";
import { User } from "../schemas/user";
import { decodeToken } from "../helper/token.util";
import { IPayloadToken } from "interfaces/IUser";
import { NotAuthorizedError } from "../common/errors/not-authorized.error";

const checkToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedData = decodeToken(req.headers.authorization);
    if (!decodedData) {
      throw new NotAuthorizedError();
    }
    const { _id } = <IPayloadToken>decodedData;
    let currentUser = await User.findById(_id);
    currentUser = currentUser.toObject();
    delete currentUser.password;
    delete currentUser.salt;
    req.currentUser = currentUser;
    next();
  }
);

export { checkToken };
