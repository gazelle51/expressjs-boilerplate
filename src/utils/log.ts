import { Request, Response } from "express";
import { Logger } from "winston";

/**
 * Log when an API request is received.
 * @param winston - Winston logger
 * @param req - Express request
 */
function reqReceived(winston: Logger, req: Request): void {
  let files: any[] = [];

  // List of files
  try {
    Object.keys(req.files).forEach((key) => {
      files.push({
        key: key,
        // @ts-ignore
        filename: req.files[key].name,
        // @ts-ignore
        mimetype: req.files[key].mimetype,
        // @ts-ignore
        size: req.files[key].size + "B",
      });
    });
  } catch (err) {}

  // Log request received
  winston.info(
    `Request received - ${req.connection.remoteAddress} "${req.method} ${
      req.originalUrl
    }" "${req.get("Referrer")}" "${req.get("User-Agent")}"`,
    { queryParams: req.query, body: req.body, files }
  );
}

/**
 * Log when an API request is received.
 * @param winston - Winston logger
 * @param req - Express request
 * @param res - Express response
 */
function reqComplete(winston: Logger, req: Request, res: Response): void {
  // Log request complete
  winston.info(
    `Request complete in ${res.get("x-response-time")} - ${
      req.connection.remoteAddress
    } "${req.method} ${req.originalUrl}" ${res.statusCode} ${res.get(
      "content-length"
    )} "${req.get("Referrer")}" "${req.get("User-Agent")}"`
  );
}

export default { reqReceived, reqComplete };
