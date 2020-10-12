import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authenSchema, User } from "../schemas/user";
import BadRequestError from "../common/errors/bad-request.error";
import { asyncHandler, validateRequest } from "../middlewares";

const SALT = 10;
const privateKey = process.env.PRIVATE_KEY || "";

router.post(
  "/register",
  authenSchema,
  validateRequest,
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;

    const existedUser = await User.findOne({ email }).exec();
    if (existedUser) {
      throw new BadRequestError("Email registered!");
    }

    const hashedPassword = await bcrypt.hash(password, SALT);
    const user = await User.create({
      email,
      password: hashedPassword,
      nickname,
    });
    return res.status(200).json({
      message: "User created",
      user,
    });
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

    const token = await jwt.sign({ userId: user._id }, privateKey);
    return res.status(200).json({
      message: "Login successfully!",
      token,
    });
  })
);

export default router;
