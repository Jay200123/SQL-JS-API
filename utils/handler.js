/**
 * Creates a custom handler class that handles Successful HTTP responses.
 * This class takes the response object as a parameter and sets it as a property of the Handler Class instance.
 * It has a method called SuccessHandler that takes three parameters: StatusCode, data and message
 * The SuccessHandler method sends a JSON response with the status code, data and message.
 */
export class Handler {
  /**
   * @param {Object} res - The response object
   * The constructor takes the response object as a paramater and set it as the Handler class instance property.
   * @returns {Handler}
   */
  constructor(res) {
    /**
     * Sets the response object as a property of the Handler class instance.
     * This allows you to use the response object in the SuccessHandler method.
     */
    this.res = res;
  }

  /**
   * @param {number} statusCode - The custom HTTP status code to send
   * @param {Object} data - The data to send in the response
   * @param {string} message - The success message to send
   */
  SuccessHandler(statusCode, data, message) {
    /**
     * The SuccessHandler method takes three parameters: StatusCode, data and message.
     * It sends a JSON response with the status code, data and message.
     */
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
 * @returns {ErrorHandler}
 * @class ErrorHandler
 * @extends {Error}
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
