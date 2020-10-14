export interface IUserRegisterDTO {
  email: string;
  password: string;
  nickname: string;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  nickname: string;
  salt: string;
}

export interface IPayloadToken {
  _id: string;
}
