import bcrypt from "bcrypt";
import {
  IUserLoginDTO,
  IUserRegisterDTO,
  IPayloadToken,
} from "../interfaces/IUser";
import BadRequestError from "../common/errors/bad-request.error";
import { Models } from "../../@types/express";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import config from "../config";

const SALT = 10;
export default class UserService {
  userModel: Models.UserModel;
  constructor(userModel: Models.UserModel) {
    this.userModel = userModel;
  }

  public async register(userRegisterDTO: IUserRegisterDTO) {
    const { email, password, nickname } = userRegisterDTO;
    const existedUser = await this.userModel.findOne({ email }).exec();
    if (existedUser) {
      throw new BadRequestError("Email registered!");
    }

    const salt = randomBytes(32);
    const hashedPassword = await bcrypt.hash(password, SALT);
    let user = await this.userModel.create({
      email,
      salt: salt.toString("hex"),
      password: hashedPassword,
      nickname,
    });

    user = user.toObject();
    delete user.password;
    delete user.salt;
    return user;
  }

  public async login(userLoginDTO: IUserLoginDTO) {
    const { email, password } = userLoginDTO;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new BadRequestError("The email hasn't been registered!");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new BadRequestError("Wrong password!");
    }

    const token = await this.generateToken({ _id: user._id });
    return token;
  }

  private async generateToken(payload: IPayloadToken) {
    return await jwt.sign(payload, config.jwtSecret);
  }
}
