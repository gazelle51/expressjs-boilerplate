import appRoot from "app-root-path";
import httpContext from "express-http-context";
import winston from "winston";
import { Format } from "logform";
import { LogOptions } from "./models/Winston";

// Formatting of dev console logs
const consoleFormat: Format = winston.format.printf(
  ({ level, message, timestamp }) => {
    let colourLevel: string;

    // Trace ID
    const traceID = httpContext.get("traceID");

    // Colour of log
    colourLevel = winston.format
      .colorize()
      .colorize(level, `${level.toUpperCase()}`);

    // Formatting of requests vs other app logs
    if (traceID !== undefined) {
      return `[traceID: ${traceID}]: ${colourLevel} - ${message}`;
    } else {
      return `${colourLevel} - ${message}`;
    }
  }
);

const jsonFormat: Format = winston.format.printf(
  ({ level, message, timestamp, ...meta }) => {
    // Trace ID
    const traceID = httpContext.get("traceID");

    // Formatting of JSON
    return JSON.stringify({
      traceID: traceID,
      unixTimestamp: Math.round(new Date(timestamp).getTime() / 1000),
      level: level,
      message: message,
      ...meta,
    });
  }
);

// Custom settings for each transport
let options: LogOptions = {
  fileDebug: {
    level: "debug",
    filename: `${appRoot.toString()}/logs/app.log`,
    handleExceptions: true,
    format: winston.format.combine(winston.format.timestamp(), jsonFormat),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  file: {
    level: "info",
    filename: `${appRoot.toString()}/logs/app.log`,
    handleExceptions: true,
    format: winston.format.combine(winston.format.timestamp(), jsonFormat),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  consoleDebug: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(winston.format.timestamp(), consoleFormat),
  },
  consoleDev: {
    level: "info",
    handleExceptions: true,
    format: winston.format.combine(winston.format.timestamp(), consoleFormat),
  },
  consoleProd: {
    level: "info",
    handleExceptions: true,
    format: winston.format.combine(winston.format.timestamp(), jsonFormat),
  },
};

// Create new Winston Logger for each environment
let logger: winston.Logger;
if (process.env.NODE_ENV === "production") {
  logger = winston.createLogger({
    transports: [new winston.transports.Console(options.consoleProd)],
    exitOnError: false, // Do not exit on handled exceptions
  });
} else if (process.env.NODE_ENV === "debug") {
  logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.fileDebug),
      new winston.transports.Console(options.consoleDebug),
    ],
    exitOnError: false, // Do not exit on handled exceptions
  });
} else {
  logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.consoleDev),
    ],
    exitOnError: false, // Do not exit on handled exceptions
  });
}

export default logger;
