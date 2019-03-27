import httpContext from "express-http-context";
import log from "../utils/log";
import uuidv4 from "uuid/v4";
import winston from "../config/winston";
import { Request, Response, NextFunction } from "express";

/**
 * Create a trace ID for the request.
 * @function
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export const createTraceID = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  winston.debug(`middlewares/logging/createTraceID: Create request trace ID`);

  // Create trace ID
  req.traceID = uuidv4();

  // Make trace ID available in httpContext
  httpContext.set("traceID", req.traceID);

  next();
};

/**
 * Log when a request has been received.
 * @function
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export const logRequestReceived = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Log request received
    log.reqReceived(winston, req);

    // Pass request to routers
    next();
  } catch (err) {
    next(err);
  }
};

export default {
  createTraceID,
  logRequestReceived
};
