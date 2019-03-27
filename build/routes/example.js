"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exampleFunctions_1 = __importDefault(require("../services/exampleFunctions"));
const APIResponse_1 = require("../config/models/APIResponse");
const validation_1 = require("../middlewares/validation");
const check_1 = require("express-validator/check");
// Import loggers
const log_1 = __importDefault(require("../utils/log"));
const winston_1 = __importDefault(require("../config/winston"));
const router = express_1.default.Router();
/**
 *  GET add 2 randomly generated numbers.
 */
router.get("/add/random", function (req, res, next) {
    let data;
    try {
        winston_1.default.debug("routes/example/add/random");
        // Add random numbers
        data = {
            status: APIResponse_1.Status.OK,
            code: APIResponse_1.HttpStatusCode.OK,
            data: exampleFunctions_1.default.addRandomNumbers()
        };
        // Send response
        res.json(data);
        // Log request complete
        log_1.default.reqComplete(winston_1.default, req, res);
    }
    catch (err) {
        next(err);
    }
});
/**
 *  GET subtract 2 randomly generated numbers.
 */
router.get("/subtract/random", function (req, res, next) {
    let data;
    try {
        winston_1.default.debug("routes/example/subtract/random");
        // Subtract random numbers
        data = {
            status: APIResponse_1.Status.OK,
            code: APIResponse_1.HttpStatusCode.OK,
            data: exampleFunctions_1.default.subtractRandomNumbers()
        };
        // Send response
        res.json(data);
        // Log request complete
        log_1.default.reqComplete(winston_1.default, req, res);
    }
    catch (err) {
        next(err);
    }
});
/**
 *  GET add 2 numbers.
 */
router.get("/add/:x/:y", validation_1.exampleAddXY, function (req, res, next) {
    let data;
    try {
        winston_1.default.debug("routes/example/add/:x/:y");
        // Throw validation error if it exists
        check_1.validationResult(req).throw();
        // Add numbers
        data = {
            status: APIResponse_1.Status.OK,
            code: APIResponse_1.HttpStatusCode.OK,
            data: exampleFunctions_1.default.addNumbers(parseFloat(req.params.x), parseFloat(req.params.y))
        };
        // Send response
        res.json(data);
        // Log request complete
        log_1.default.reqComplete(winston_1.default, req, res);
    }
    catch (err) {
        next(err);
    }
});
/**
 *  GET subtract 2 numbers.
 */
router.get("/subtract/:x/:y", validation_1.exampleSubtractXY, function (req, res, next) {
    let data;
    try {
        winston_1.default.debug("routes/example/subtract/:x/:y");
        // Throw validation error if it exists
        check_1.validationResult(req).throw();
        // Subtract numbers
        data = {
            status: APIResponse_1.Status.OK,
            code: APIResponse_1.HttpStatusCode.OK,
            data: exampleFunctions_1.default.subtractNumbers(parseFloat(req.params.x), parseFloat(req.params.y))
        };
        // Send response
        res.json(data);
        // Log request complete
        log_1.default.reqComplete(winston_1.default, req, res);
    }
    catch (err) {
        next(err);
    }
});
/**
 *  GET examples of different logging levels.
 */
router.get("/logs", function (req, res, next) {
    let data;
    try {
        winston_1.default.debug("routes/example/logs");
        // Log examples to console
        winston_1.default.error("This is an error log");
        winston_1.default.info("This is an info log");
        winston_1.default.warn("This is a warn log");
        winston_1.default.verbose("This is a verbose log");
        winston_1.default.debug("This is a debug log");
        winston_1.default.silly("This is a silly log, it will never be printed");
        // Set up response object
        data = {
            status: APIResponse_1.Status.OK,
            code: APIResponse_1.HttpStatusCode.OK,
            data: { message: "Example logs in console and logs/app.log" }
        };
        // Send response
        res.json(data);
        // Log request complete
        log_1.default.reqComplete(winston_1.default, req, res);
    }
    catch (err) {
        next(err);
    }
});
/**
 *  GET example of an error in the application.
 */
router.get("/error", function (req, res, next) {
    try {
        winston_1.default.debug("routes/example/error");
        // Throw an error
        winston_1.default.debug(`Throwing an error`);
        throw new Error(`Sample error!`);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=example.js.map