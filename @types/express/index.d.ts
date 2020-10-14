import { Document, Model } from "mongoose";
import { IUser } from "../../src/interfaces/IUser";

declare namespace Express {
  export interface Request {
    currentUser?: any;
  }
  export interface Response {
    sendData?: any;
  }
}

declare namespace Models {
  export type UserModel = Model<IUser & Document>;
}
