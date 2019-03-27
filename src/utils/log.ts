import { Request, Response } from "express";
import { Logger } from "winston";

/**
 * Log when an API request is received.
 * @function
 * @param winston Winston logger
 * @param req Express request
 */
export const reqReceived = (winston: Logger, req: Request): void => {
  // Log request received
  winston.info(
    `Request received - ${req.connection.remoteAddress} "${req.method} ${
      req.originalUrl
    }" "${req.get("Referrer")}" "${req.get("User-Agent")}"`
  );
};

/**
 * Log when an API request is received.
 * @function
 * @param winston Winston logger
 * @param req Express request
 * @param res Express response
 */
export const reqComplete = (
  winston: Logger,
  req: Request,
  res: Response
): void => {
  // Log request complete
  winston.info(
    `Request complete - ${req.connection.remoteAddress} "${req.method} ${
      req.originalUrl
    }" ${res.statusCode} ${res.get("content-length")} "${req.get(
      "Referrer"
    )}" "${req.get("User-Agent")}"`
  );
};

export default { reqReceived, reqComplete };
