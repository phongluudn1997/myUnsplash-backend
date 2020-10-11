import CustomError from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");
  }
  statusCode = 400;
  serializeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  }
}
