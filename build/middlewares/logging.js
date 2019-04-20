"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_http_context_1 = __importDefault(require("express-http-context"));
const log_1 = __importDefault(require("../utils/log"));
const v4_1 = __importDefault(require("uuid/v4"));
const winston_1 = __importDefault(require("../config/winston"));
/**
 * Create a trace ID for the request.
 * @function
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
exports.createTraceID = (req, res, next) => {
    winston_1.default.debug(`middlewares/logging/createTraceID: Create request trace ID`);
    // Create trace ID
    req.traceID = v4_1.default();
    // Make trace ID available in httpContext
    express_http_context_1.default.set("traceID", req.traceID);
    next();
};
/**
 * Log when a request has been received.
 * @function
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
exports.logRequestReceived = (req, res, next) => {
    try {
        // Log request received
        log_1.default.reqReceived(winston_1.default, req);
        log_1.default.reqData(winston_1.default, req);
        // Pass request to routers
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.default = {
    createTraceID: exports.createTraceID,
    logRequestReceived: exports.logRequestReceived
};
//# sourceMappingURL=logging.js.map