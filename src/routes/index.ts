import express from "express";
import {
  APIResponseOK,
  Status,
  HttpStatusCode
} from "../config/models/APIResponse";

// Import loggers
import log from "../utils/log";
import winston from "../config/winston";

const router = express.Router();

/**
 * GET home page
 */
router.get("/", function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let output: APIResponseOK;

  try {
    winston.debug("routes/index/");

    // Set up response object
    output = {
      status: Status.OK,
      code: HttpStatusCode.OK,
      data: {
        message: `The is an Express API for ${
          process.env.npm_package_name
        }. Current version is v1.`
      }
    };

    // Send response
    res.json(output);

    // Log request complete
    log.reqComplete(winston, req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * GET API home page
 */
router.get("/api/v1", function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let output: APIResponseOK;

  try {
    winston.debug("routes/index/api/v1");

    // Set up response object
    output = {
      status: Status.OK,
      code: HttpStatusCode.OK,
      data: {
        message: `This is the API v1 landing page.`
      }
    };

    // Send response
    res.json(output);

    // Log request complete
    log.reqComplete(winston, req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
