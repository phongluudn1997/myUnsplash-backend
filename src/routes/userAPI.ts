import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import UserService from "../services/user.service";
import { authenSchema } from "../schemas/user";
import { asyncHandler, validateRequest } from "../middlewares";
import { CreatedResponse } from "../common/response/created.response";
import userModel from "../schemas/user/user.model";
import { OkResponse } from "../common/response/ok.response";

router.post(
  "/register",
  authenSchema,
  validateRequest,
  asyncHandler(async (req: Request, res: Response) => {
    const userServiceInstance = new UserService(userModel);
    const newUser = await userServiceInstance.register(req.body);
    return new CreatedResponse({ data: newUser }).send(res);
  })
);

router.post(
  "/login",
  authenSchema,
  validateRequest,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userServiceInstance = new UserService(userModel);
    const token = await userServiceInstance.login(req.body);
    return new OkResponse({
      message: "Login successfully!",
      data: { token },
    }).send(res);
  })
);

export default router;
