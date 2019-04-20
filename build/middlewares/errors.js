"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("../utils/log"));
const winston_1 = __importDefault(require("../config/winston"));
const APIResponse_1 = require("../config/models/APIResponse");
/**
 * Catch requests which do not have an existing route and send 404 status.
 * @function
 * @param req Express request
 * @param res Express response
 */
exports.catch404 = (req, res) => {
    // Log error
    winston_1.default.error(`${APIResponse_1.HttpStatusCode.NotFound} - Not Found`);
    // Send 404
    res.status(APIResponse_1.HttpStatusCode.NotFound).send();
    // Log request complete
    log_1.default.reqComplete(winston_1.default, req, res);
};
/**
 * Catch and handle errors.
 * @function
 * @param err Error that has been thrown
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
exports.errorHandler = (err, req, res, next) => {
    let errCode;
    let errError;
    let output;
    let validationError;
    try {
        // Validation errors
        // Get error message
        validationError = err.mapped();
        // Error properties
        errCode = APIResponse_1.HttpStatusCode.UnprocessableEntity;
        errError = "";
        Object.keys(validationError).forEach((key) => {
            errError += `${key} ${validationError[key].msg}, `;
        });
        errError = errError.trim().slice(0, -1);
    }
    catch (_a) {
        // Other errors
        // Error properties
        errCode = err.status || APIResponse_1.HttpStatusCode.InternalServerError;
        errError = err.message || "Something went wrong";
    }
    // Log error
    winston_1.default.error(`${errCode} - ${errError}`);
    // Send error response
    output = {
        status: APIResponse_1.Status.error,
        code: errCode,
        error: errError
    };
    res.status(errCode);
    res.json(output);
    // Log request complete
    log_1.default.reqComplete(winston_1.default, req, res);
};
exports.default = {
    catch404: exports.catch404,
    errorHandler: exports.errorHandler
};
//# sourceMappingURL=errors.js.map