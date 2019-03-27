"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Log when an API request is received.
 * @function
 * @param winston Winston logger
 * @param req Express request
 */
exports.reqReceived = (winston, req) => {
    // Log request received
    winston.info(`Request received - ${req.connection.remoteAddress} "${req.method} ${req.originalUrl}" "${req.get("Referrer")}" "${req.get("User-Agent")}"`);
};
/**
 * Log when an API request is received.
 * @function
 * @param winston Winston logger
 * @param req Express request
 * @param res Express response
 */
exports.reqComplete = (winston, req, res) => {
    // Log request complete
    winston.info(`Request complete - ${req.connection.remoteAddress} "${req.method} ${req.originalUrl}" ${res.statusCode} ${res.get("content-length")} "${req.get("Referrer")}" "${req.get("User-Agent")}"`);
};
exports.default = { reqReceived: exports.reqReceived, reqComplete: exports.reqComplete };
//# sourceMappingURL=log.js.map