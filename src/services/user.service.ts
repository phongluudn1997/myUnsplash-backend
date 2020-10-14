import bcrypt from "bcrypt";
import { IUserRegisterDTO } from "../interfaces/IUser";
import BadRequestError from "../common/errors/bad-request.error";
import { Models } from "../../@types/express";
import { randomBytes } from "crypto";

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
}
