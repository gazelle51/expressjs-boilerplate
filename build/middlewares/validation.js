"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
// Validator for req.files
// @ts-ignore
const checkFiles = check_1.buildCheckFunction(["files"]);
/**
 * Validations for example/add/:x/:y route
 */
exports.exampleAddXY = [
    check_1.param("x")
        .isNumeric()
        .withMessage("must be a number"),
    check_1.param("y")
        .isNumeric()
        .withMessage("must be a number")
];
/**
 * Validations for example/subtract/:x/:y route
 */
exports.exampleSubtractXY = [
    check_1.param("x")
        .isNumeric()
        .withMessage("must be a number"),
    check_1.param("y")
        .isNumeric()
        .withMessage("must be a number")
];
//# sourceMappingURL=validation.js.map