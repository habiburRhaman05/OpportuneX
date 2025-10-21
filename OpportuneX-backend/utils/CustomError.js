module.exports = class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the name of this error is the class name
    this.name = this.constructor.name;

    // Capture the stack trace (excludes constructor from it)
    Error.captureStackTrace(this, this.constructor);
  }
}
