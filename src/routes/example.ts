import express from "express";
import exampleFunctions from "../services/exampleFunctions";
import {
  APIResponseOK,
  Status,
  HttpStatusCode
} from "../config/models/APIResponse";
import { exampleAddXY, exampleSubtractXY } from "../middlewares/validation";
import { validationResult } from "express-validator/check";

// Import loggers
import log from "../utils/log";
import winston from "../config/winston";

const router = express.Router();

/**
 *  GET add 2 randomly generated numbers.
 */
router.get("/add/random", function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let data: APIResponseOK;

  try {
    winston.debug("routes/example/add/random");

    // Add random numbers
    data = {
      status: Status.OK,
      code: HttpStatusCode.OK,
      data: exampleFunctions.addRandomNumbers()
    };

    // Send response
    res.json(data);

    // Log request complete
    log.reqComplete(winston, req, res);
  } catch (err) {
    next(err);
  }
});

/**
 *  GET subtract 2 randomly generated numbers.
 */
router.get("/subtract/random", function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let data: APIResponseOK;

  try {
    winston.debug("routes/example/subtract/random");

    // Subtract random numbers
    data = {
      status: Status.OK,
      code: HttpStatusCode.OK,
      data: exampleFunctions.subtractRandomNumbers()
    };

    // Send response
    res.json(data);

    // Log request complete
    log.reqComplete(winston, req, res);
  } catch (err) {
    next(err);
  }
});

/**
 *  GET add 2 numbers.
 */
router.get("/add/:x/:y", exampleAddXY, function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let data: APIResponseOK;

  try {
    winston.debug("routes/example/add/:x/:y");

    // Throw validation error if it exists
    validationResult(req).throw();

    // Add numbers
    data = {
      status: Status.OK,
      code: HttpStatusCode.OK,
      data: exampleFunctions.addNumbers(
        parseFloat(req.params.x),
        parseFloat(req.params.y)
      )
    };

    // Send response
    res.json(data);

    // Log request complete
    log.reqComplete(winston, req, res);
  } catch (err) {
    next(err);
  }
});

/**
 *  GET subtract 2 numbers.
 */
router.get("/subtract/:x/:y", exampleSubtractXY, function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let data: APIResponseOK;

  try {
    winston.debug("routes/example/subtract/:x/:y");

    // Throw validation error if it exists
    validationResult(req).throw();

    // Subtract numbers
    data = {
      status: Status.OK,
      code: HttpStatusCode.OK,
      data: exampleFunctions.subtractNumbers(
        parseFloat(req.params.x),
        parseFloat(req.params.y)
      )
    };

    // Send response
    res.json(data);

    // Log request complete
    log.reqComplete(winston, req, res);
  } catch (err) {
    next(err);
  }
});

/**
 *  GET examples of different logging levels.
 */
router.get("/logs", function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let data: APIResponseOK;

  try {
    winston.debug("routes/example/logs");

    // Log examples to console
    winston.error("This is an error log");
    winston.info("This is an info log");
    winston.warn("This is a warn log");
    winston.verbose("This is a verbose log");
    winston.debug("This is a debug log");
    winston.silly("This is a silly log, it will never be printed");

    // Set up response object
    data = {
      status: Status.OK,
      code: HttpStatusCode.OK,
      data: { message: "Example logs in console and logs/app.log" }
    };

    // Send response
    res.json(data);

    // Log request complete
    log.reqComplete(winston, req, res);
  } catch (err) {
    next(err);
  }
});

/**
 *  GET example of an error in the application.
 */
router.get("/error", function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    winston.debug("routes/example/error");

    // Throw an error
    winston.debug(`Throwing an error`);
    throw new Error(`Sample error!`);
  } catch (err) {
    next(err);
  }
});

export default router;
