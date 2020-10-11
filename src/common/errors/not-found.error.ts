import CustomError from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: "API not found",
      },
    ];
  }
  constructor() {
    super("API not found");
  }
}
