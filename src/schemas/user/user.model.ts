import { IUser } from "interfaces/IUser";

import { Schema, Document, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    salt: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform(_: any, ret: any) {
        delete ret.password;
        delete ret.salt;
        return ret;
      },
    },
  }
);

export type IUserDocument = IUser & Document;

export default model<IUserDocument>("User", UserSchema, "users");
