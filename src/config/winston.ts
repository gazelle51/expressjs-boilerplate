import appRoot from "app-root-path";
import httpContext from "express-http-context";
import winston from "winston";
import { Format } from "logform";

// Formatting of console logs
const consoleFormat: Format = winston.format.printf(
  ({ level, message, timestamp }) => {
    let logLevel: string;

    // Colour of log
    logLevel = winston.format
      .colorize()
      .colorize(level, `${level.toUpperCase()}`);

    return `${timestamp} [${logLevel}] ${message}`;
  }
);

// Formatting of JSON logs
const jsonFormat: Format = winston.format.printf(
  ({ level, message, timestamp, ...meta }) => {
    // Trace ID
    const traceID = httpContext.get("traceID");

    // Formatting of JSON
    return JSON.stringify({
      traceID,
      timestamp, // Math.round(new Date(timestamp).getTime() / 1000),
      level,
      message,
      ...meta,
    });
  }
);

// Logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL,
      format: winston.format.combine(winston.format.timestamp(), consoleFormat),
    }),
    new winston.transports.File({
      filename: `${appRoot.toString()}/logs/app.log`,
      level: "info",
      format: winston.format.combine(winston.format.timestamp(), jsonFormat),
    }),
    new winston.transports.File({
      filename: `${appRoot.toString()}/logs/debug.log`,
      level: "debug",
      maxsize: 10485760, // 10MB
      maxFiles: 5,
      format: winston.format.combine(winston.format.timestamp(), jsonFormat),
    }),
  ],
});

export default logger;
