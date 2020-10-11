abstract class CustomError extends Error {
  abstract statusCode: number;

  protected constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): { message: string; field?: string }[] ;
}

export default CustomError;
