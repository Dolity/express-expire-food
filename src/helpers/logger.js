const winston = require("winston");

const { combine, timestamp, colorize, printf } = winston.format;

// Custom format with timestamp and color
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} |${level}| ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp
    colorize(), // Add colors
    logFormat // Apply custom format
  ),
  transports: [
    new winston.transports.File({
      filename: "src/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "src/logs/normal.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        colorize(),
        logFormat
      ),
    })
  );
}

module.exports = logger;
