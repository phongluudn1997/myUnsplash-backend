import bcrypt from "bcrypt";
import BadRequestError from "../common/errors/bad-request.error";
import { User } from "../schemas/user";

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
