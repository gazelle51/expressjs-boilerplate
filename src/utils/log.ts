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
 * Log data sent to API request.
 * @function
 * @param winston Winston logger
 * @param req Express request
 */
export const reqData = (winston: Logger, req: Request): void => {
  // let files: string;
  // let filesTemp: Array<any>;

  // // Log request files
  // try {
  //   filesTemp = [];

  //   Object.keys(req.files).forEach(key => {
  //     filesTemp.push({
  //       key: key,
  //       // @ts-ignore
  //       filename: req.files[key].name,
  //       // @ts-ignore
  //       mimetype: req.files[key].mimetype,
  //       // @ts-ignore
  //       size: req.files[key].size + "B"
  //     });
  //   });

  //   files = JSON.stringify(filesTemp);
  // } catch (err) {
  //   files = "undefined";
  // }

  // Log request data
  winston.info(`Request query params: ${JSON.stringify(req.query)}`);
  winston.info(`Request headers: ${JSON.stringify(req.header)}`);
  winston.info(`Request cookies: ${JSON.stringify(req.cookies)}`);
  winston.info(`Request body: ${JSON.stringify(req.body)}`);
  // winston.info(`Request files: ${files}`);
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

export default { reqReceived, reqData, reqComplete };
