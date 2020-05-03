/**********************/
/* Set up environment */
/**********************/

// Import modules
import bodyParser from "body-parser";
import cors from "cors";
import envVars from "./utils/environmentVariables";
import errors from "./middlewares/errors";
import express from "express";
// import fileUpload from "express-fileupload";
import httpContext from "express-http-context";
import logging from "./middlewares/logging";
import swaggerUi from "swagger-ui-express";
import winston from "./config/winston";
import YAML from "yamljs";

// Import routes
import indexRouter from "./routes/index";
import exampleRouter from "./routes/example";

// Log starting application
winston.info(`Starting application in ${process.env.NODE_ENV} mode`);

// Load environment variables in dev or debug environment
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "debug"
) {
  envVars.loadEnvironmentVariables();
  winston.info("Local environment variables successfully loaded");
}

/****************************/
/* Set up Express framework */
/****************************/

// Create app
const app = express();
const port = parseInt(process.env.PORT) || 3000;

// CORS
app.use(cors());
app.options("*", cors());

// Body parsers
app.use(bodyParser.json()); // application/json
// app.use(bodyParser.raw()); // raw
// app.use(bodyParser.text()); // text/plain
// app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
// app.use(fileUpload()); // form-data/file, if using this uncomment the "express-fileupload" import line

// Allow trace ID to be used anywhere
app.use(httpContext.middleware);

// Create trace ID for request
app.use(logging.createTraceID);

// Log request received
app.use(logging.logRequestReceived);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load("./swagger.yaml"))
);

// Routes
app.use("/", indexRouter);
app.use("/api/v1/example", exampleRouter);

// Catch 404
app.use(errors.catch404);

/******************/
/* Error handling */
/******************/

// Error handler
app.use(errors.errorHandler);

/*****************************/
/* Start Express application */
/*****************************/

// Create server
app.listen(port, (err: any) => {
  winston.info(`${process.env.npm_package_name} is listening at port ${port}`);
});
