import CustomError from "./custom-error";

export class NotAuthorizedError extends CustomError {
  constructor() {
    super("Not Authorized");
  }
  statusCode: number = 401;
  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: "Not authorized",
      },
    ];
  }
}
