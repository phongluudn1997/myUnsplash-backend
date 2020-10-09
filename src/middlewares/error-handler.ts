import { Request, Response, NextFunction } from "express";
import CustomError from "../common/errors/custom-error";

const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }
  return res.status(500).json({
    errors: [
      {
        message: err.message,
      },
    ],
  });
};

export { handleError };
