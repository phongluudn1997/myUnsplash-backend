import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import bcrypt from "bcrypt";
import { register } from "../services/user.service";
import { authenSchema, User } from "../schemas/user";
import BadRequestError from "../common/errors/bad-request.error";
import { asyncHandler, validateRequest } from "../middlewares";
import { generateToken } from "../helper/token.util";
import { CreatedResponse } from "../common/response/created.response";

router.post(
  "/register",
  authenSchema,
  validateRequest,
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;
    const newUser = await register(email, password, nickname);
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
