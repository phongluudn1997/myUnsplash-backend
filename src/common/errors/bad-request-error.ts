import CustomError from "./custom-error";

class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string = "Bad request") {
    super("Bad request");
  }
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export default BadRequestError;
