import { Document, Model } from "mongoose";
import { IUser } from "../../src/interfaces/IUser";
import { IPhoto } from "../../src/interfaces/IPhoto";

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
    export interface Response {
      sendData?: any;
    }
  }
}

declare namespace Models {
  export type UserModel = Model<IUser & Document>;
  export type PhotoModel = Model<IPhoto & Document>;
}
