const {createLogger,format,transports} = require("winston")

const path = require("path")

// Log format: timestamp + level + message
const logFormat = format.printf(({ timestamp, level, message, stack }) => {
  return` ${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});




module.exports = logger = createLogger({
  level: "info", // default: info, can be changed via env
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }), // log stack trace
    format.splat(),
    format.json(),
    logFormat
  ),
  transports: [
    // Console output
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),

    // File: all logs
    new transports.File({
      filename: path.join("logs", "combined.log"),
      level: "info",
    }),

    // File: error logs only
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

