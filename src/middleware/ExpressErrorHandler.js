class ExpressErrorHandler extends Error {
  constructor(statusCode, message, error) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.error = error || "Something Wrong";
  }
}

export default ExpressErrorHandler;
