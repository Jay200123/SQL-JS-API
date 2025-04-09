// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  /**
   * Logs the captured Error Stack
   */
  console.error({
    ERROR_RESPONSE: {
      message: err.message,
      stack: err.stack,
      date: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
    },
  });

  /**
   * Set the status code and message for the response
   * - If the error has a statusCode property, use that
   * - Otherwise, default to 500 (Internal Server Error)
   */
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  /**
   * Returns the error response to the client
   * with the appropriate status code and message.
   * * @param {Object} res - The response object
   * @param {number} statusCode - The HTTP status code to send
   * @param {string} errorMessage - The error message to send
   *
   */
  return res.status(statusCode).json({
    status: "error",
    message: errorMessage,
  });
};
