import {
  body,
  cookie,
  header,
  param,
  query,
  buildCheckFunction,
  ValidationChain
} from "express-validator/check";

// Validator for req.files
// @ts-ignore
const checkFiles = buildCheckFunction(["files"]);

/**
 * Validations for example/add/:x/:y route
 */
export const exampleAddXY: Array<ValidationChain> = [
  param("x")
    .isNumeric()
    .withMessage("must be a number"),
  param("y")
    .isNumeric()
    .withMessage("must be a number")
];

/**
 * Validations for example/subtract/:x/:y route
 */
export const exampleSubtractXY: Array<ValidationChain> = [
  param("x")
    .isNumeric()
    .withMessage("must be a number"),
  param("y")
    .isNumeric()
    .withMessage("must be a number")
];
