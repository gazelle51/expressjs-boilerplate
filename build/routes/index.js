"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const APIResponse_1 = require("../config/models/APIResponse");
// Import loggers
const log_1 = __importDefault(require("../utils/log"));
const winston_1 = __importDefault(require("../config/winston"));
const router = express_1.default.Router();
/**
 * GET home page
 */
router.get("/", function (req, res, next) {
    let output;
    try {
        winston_1.default.debug("routes/index/");
        // Set up response object
        output = {
            status: APIResponse_1.Status.OK,
            code: APIResponse_1.HttpStatusCode.OK,
            data: {
                message: `The is an Express API for ${process.env.npm_package_name}. Current version is v1.`
            }
        };
        // Send response
        res.json(output);
        // Log request complete
        log_1.default.reqComplete(winston_1.default, req, res);
    }
    catch (err) {
        next(err);
    }
});
/**
 * GET API home page
 */
router.get("/api/v1", function (req, res, next) {
    let output;
    try {
        winston_1.default.debug("routes/index/api/v1");
        // Set up response object
        output = {
            status: APIResponse_1.Status.OK,
            code: APIResponse_1.HttpStatusCode.OK,
            data: {
                message: `This is the API v1 landing page.`
            }
        };
        // Send response
        res.json(output);
        // Log request complete
        log_1.default.reqComplete(winston_1.default, req, res);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map