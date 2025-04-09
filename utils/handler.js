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

/**
 * Creating a custom error handler class that extends the built-in Error class.
 * This class will be used to handle errors in a more structured way.
 * This class takes statusCode and message as parameters and sets them as properties of the ErrorHandler instance.
 * It also captures the stack trace of the error for debugging purposes.
 * The super() method is called to invoke the constructor of the parent class (Error) with the message parameter. 
 * The captureStackTrace method is called to capture the stack trace of the error at the point where it was created.
 */
export class ErrorHandler extends Error {
  /**
   * @param {number} statusCode - The HTTP status code to send
   * @param {string} message - The error message to send
   */
  constructor(statusCode, message) {
    /** 
     * Here super calls the constructor of the parent Error class with message argument
    */
    super(message); 
    /**
     * Sets the statusCode and message properties of the ErrorHandler instance.
     * The statusCode property is set to the value passed in the constructor.
     */
    this.statusCode = statusCode;
    /**
     * The message property is set to the value passed in the constructor.
     * This allows you to create custom error messages for different types of errors.
     */ 
    this.message = message;
    /**
     * The stack property is set to the stack trace of the error.
     * This allows you to see where the error occurred in the code.
     */
    Error.captureStackTrace(this, this.constructor);
  }
}
