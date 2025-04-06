export class Handler {
  constructor(res) {
    this.res = res;
  }

  SuccessHandler(statusCode, data, message) {
    return this.res.status(statusCode).json({
      data: data,
      message: message,
      status: "success",
    });
  }
}

export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
