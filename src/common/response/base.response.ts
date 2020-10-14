import { Response } from "express";

export abstract class BaseResponse {
  abstract statusCode: number;
  abstract send(res: Response): void;
}
