import { BaseResponse } from "./base.response";
import { Response } from "express";

export class OkResponse<T> extends BaseResponse {
  message: string;
  data: T;
  constructor(obj: { message?: string; data?: T }) {
    super();
    this.message = obj.message || "Your request was resovled successfully";
    this.data = obj.data;
  }
  statusCode = 200;
  send(res: Response) {
    return res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
    });
  }
}
