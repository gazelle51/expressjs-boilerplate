import log from "../utils/log";
import winston from "../config/winston";
import { Request, Response, NextFunction } from "express";
import {
  APIResponseError,
  HttpStatusCode,
  Status
} from "../config/models/APIResponse";

/**
 * Catch requests which do not have an existing route and send 404 status.
 * @function
 * @param req Express request
 * @param res Express response
 */
export const catch404 = (req: Request, res: Response): void => {
  // Log error
  winston.error(`${HttpStatusCode.NotFound} - Not Found`);

  // Send 404
  res.status(HttpStatusCode.NotFound).send();

  // Log request complete
  log.reqComplete(winston, req, res);
};

/**
 * Catch and handle errors.
 * @function
 * @param err Error that has been thrown
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let errCode: HttpStatusCode;
  let errError: string;
  let output: APIResponseError;
  let validationError: ExpressValidator.Record;

  try {
    // Validation errors

    // Get error message
    validationError = err.mapped();

    // Error properties
    errCode = HttpStatusCode.UnprocessableEntity;
    errError = "";
    Object.keys(validationError).forEach((key: string) => {
      errError += `${key} ${validationError[key].msg}, `;
    });
    errError = errError.trim().slice(0, -1);
  } catch {
    // Other errors

    // Error properties
    errCode = err.status || err.code || HttpStatusCode.InternalServerError;
    errError = err.message || "Something went wrong";
  }

  // Log error
  winston.error(`${errCode} - ${errError}`);

  // Send error response
  output = {
    status: Status.error,
    code: errCode,
    error: errError
  };
  res.status(errCode);
  res.json(output);

  // Log request complete
  log.reqComplete(winston, req, res);
};

export default {
  catch404,
  errorHandler
};
