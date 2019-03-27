"use strict";
/**********************/
/* Set up environment */
/**********************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import modules
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const environmentVariables_1 = __importDefault(require("./utils/environmentVariables"));
const errors_1 = __importDefault(require("./middlewares/errors"));
const express_1 = __importDefault(require("express"));
// import fileUpload from "express-fileupload";
const express_http_context_1 = __importDefault(require("express-http-context"));
const logging_1 = __importDefault(require("./middlewares/logging"));
const winston_1 = __importDefault(require("./config/winston"));
// Import routes
const index_1 = __importDefault(require("./routes/index"));
const example_1 = __importDefault(require("./routes/example"));
// Log starting application
winston_1.default.info(`Starting application in ${process.env.NODE_ENV} mode`);
// Load environment variables in dev or debug environment
if (process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "debug") {
    environmentVariables_1.default.loadEnvironmentVariables();
    winston_1.default.info("Local environment variables successfully loaded");
}
/****************************/
/* Set up Express framework */
/****************************/
// Create app
const app = express_1.default();
const port = parseInt(process.env.PORT) || 3000;
// CORS
app.use(cors_1.default());
app.options("*", cors_1.default());
// Body parsers
app.use(body_parser_1.default.json()); // application/json
// app.use(bodyParser.raw()); // raw
// app.use(bodyParser.text()); // text/plain
// app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
// app.use(fileUpload()); // form-data/file, if using this uncomment the "express-fileupload" import line
// Allow trace ID to be used anywhere
app.use(express_http_context_1.default.middleware);
// Create trace ID for request
app.use(logging_1.default.createTraceID);
// Log request received
app.use(logging_1.default.logRequestReceived);
// Routes
app.use("/", index_1.default);
app.use("/api/v1/example", example_1.default);
// Catch 404
app.use(errors_1.default.catch404);
/******************/
/* Error handling */
/******************/
// Error handler
app.use(errors_1.default.errorHandler);
/*****************************/
/* Start Express application */
/*****************************/
// Create server
app.listen(port, (err) => {
    winston_1.default.info(`${process.env.npm_package_name} is listening at port ${port}`);
});
//# sourceMappingURL=server.js.map