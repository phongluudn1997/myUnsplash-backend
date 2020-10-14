import { BaseResponse } from "./base.response";
import { Response } from "express";

class CreatedResponse<T> extends BaseResponse {
  message: string;
  data: T;

  constructor(obj: { message?: string; data: T }) {
    super();
    this.message = obj?.message || "Created successfully!";
    this.data = obj?.data || null;
  }
  statusCode = 201;
  send(res: Response) {
    return res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
    });
  }
}

export { CreatedResponse };
