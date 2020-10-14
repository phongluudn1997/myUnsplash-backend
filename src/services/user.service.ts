import bcrypt from "bcrypt";
import { IUserRegisterDTO } from "../interfaces/IUser";
import BadRequestError from "../common/errors/bad-request.error";
import { User } from "../schemas/user";
import userModel from "schemas/user/user.model";
import { Models } from "../../@types/express";

const SALT = 10;

export const register = async (
  email: string,
  password: string,
  nickname: string
) => {
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
  return user;
};

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

    const hashedPassword = await bcrypt.hash(password, SALT);
    let user = await this.userModel.create({
      email,
      password: hashedPassword,
      nickname,
    });
    user = user.toObject();
    delete user.password;
    return user;
  }
}
