"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const winston_1 = __importDefault(require("winston"));
// Formatting of dev console logs
const consoleFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    let colourLevel;
    // Trace ID
    const traceID = express_http_context_1.default.get("traceID");
    // Colour of log
    colourLevel = winston_1.default.format
        .colorize()
        .colorize(level, `${level.toUpperCase()}`);
    // Formatting of requests vs other app logs
    if (traceID !== undefined) {
        return `${timestamp} - [${colourLevel}]: [traceID: ${traceID}] ${message}`;
    }
    else {
        return `${timestamp} - [${colourLevel}]: ${message}`;
    }
});
const jsonFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    // Trace ID
    const traceID = express_http_context_1.default.get("traceID");
    // Formatting of JSON
    return JSON.stringify({
        traceID: traceID,
        timestamp: timestamp,
        level: level,
        message: message
    });
});
// Custom settings for each transport
let options = {
    fileDebug: {
        level: "debug",
        filename: `${app_root_path_1.default.toString()}/logs/app.log`,
        handleExceptions: true,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), jsonFormat),
        maxsize: 5242880,
        maxFiles: 5
    },
    file: {
        level: "info",
        filename: `${app_root_path_1.default.toString()}/logs/app.log`,
        handleExceptions: true,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), jsonFormat),
        maxsize: 5242880,
        maxFiles: 5
    },
    consoleDebug: {
        level: "debug",
        handleExceptions: true,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), consoleFormat)
    },
    consoleDev: {
        level: "info",
        handleExceptions: true,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), consoleFormat)
    },
    consoleProd: {
        level: "info",
        handleExceptions: true,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), jsonFormat)
    }
};
// Create new Winston Logger for each environment
let logger;
if (process.env.NODE_ENV === "production") {
    logger = winston_1.default.createLogger({
        transports: [new winston_1.default.transports.Console(options.consoleProd)],
        exitOnError: false // Do not exit on handled exceptions
    });
}
else if (process.env.NODE_ENV === "debug") {
    logger = winston_1.default.createLogger({
        transports: [
            new winston_1.default.transports.File(options.fileDebug),
            new winston_1.default.transports.Console(options.consoleDebug)
        ],
        exitOnError: false // Do not exit on handled exceptions
    });
}
else {
    logger = winston_1.default.createLogger({
        transports: [
            new winston_1.default.transports.File(options.file),
            new winston_1.default.transports.Console(options.consoleDev)
        ],
        exitOnError: false // Do not exit on handled exceptions
    });
}
exports.default = logger;
//# sourceMappingURL=winston.js.map