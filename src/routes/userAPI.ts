import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import bcrypt from "bcrypt";
import UserService, { register } from "../services/user.service";
import { authenSchema, User } from "../schemas/user";
import BadRequestError from "../common/errors/bad-request.error";
import { asyncHandler, validateRequest } from "../middlewares";
import { generateToken } from "../helper/token.util";
import { CreatedResponse } from "../common/response/created.response";
import userModel from "../schemas/user/user.model";

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
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).exec();
    if (!user) {
      throw new BadRequestError("The email hasn't been registered!");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new BadRequestError("Wrong password!");
    }

    const token = await generateToken({ userId: user._id });
    return res.status(200).json({
      message: "Login successfully!",
      token,
    });
  })
);

export default router;
