## Express Boilerplate <!-- omit in toc -->

API with ExpressJS on NodeJS

![Platform](https://img.shields.io/badge/platform-NODE-lightgrey.svg?style=flat)

### Table of Contents <!-- omit in toc -->

- [Summary](#summary)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installing the application](#installing-the-application)
  - [Testing the application](#testing-the-application)
  - [Running the application in watch mode](#running-the-application-in-watch-mode)
  - [Running the application](#running-the-application)
- [Functionality](#functionality)
  - [ExpressJS application](#expressjs-application)
  - [TypeScript](#typescript)
  - [Example routes and functions](#example-routes-and-functions)
  - [NPM scripts](#npm-scripts)
  - [Loading environment variables](#loading-environment-variables)
  - [Logging and request tracing](#logging-and-request-tracing)
  - [Input validation](#input-validation)
  - [Error handling](#error-handling)
  - [Testing](#testing)
  - [CORS](#cors)
  - [OpenAPI Documentation](#openapi-documentation)
- [Important](#important)
- [Future improvements](#future-improvements)

<a name="summary"></a>

### Summary

This repository contains boilerplate code for a RESTful API built in NodeJS using the Express framework. The project contains the functionality listed below.

- ExpressJS application
- TypeScript
- Example middlewares, routes and functions
- NPM scripts
- Loading environment variables
- Logging and request tracing
- Input validation
- Error handling
- Testing
- CORS
- OpenAPI documentation

These functionalities will be explained in detail in this document.

<a name="requirements"></a>

### Requirements

#### Local Development Tools Setup <!-- omit in toc -->

- Install a code editor such as <a href="https://code.visualstudio.com/download">VS Code</a>
- Install the latest [NodeJS](https://nodejs.org/en/download/) 6+ LTS version

<a name="getting-started"></a>

### Getting Started

<a name="installing-the-application"></a>

#### Installing the application

To install the application navigate to the app root directory in the command line. Run the following code:

```bash
npm install
```

This will install the application dependencies in the local node_modules folder. Once complete, the application can be run using one of the node scripts. Your application will run at: <a href="localhost:3000/api-docs">localhost:\<PORT\>/api-docs</a>.

You should also update the information listed below:

- `package.json`: name
- `package.json`: version
- `package.json`: description
- `package.json`: private
- `package.json`: author
- `package.json`: license
- CORS configuration
- `.env` file if environment variables are needed
- `.gitignore` if storing code in a git repository
- Body parsers used by application
- `manifest.yml`: update everything here if you plan on deploying to Cloud Foundry or similar

<a name="testing-the-application"></a>

#### Testing the application

To run the application's tests, run the code below. Ensure all tests are passing before trying to use the application.

```bash
npm run test
```

<a name="running-the-application-in-watch-mode"></a>

#### Running the application in watch mode

Running the application in watch mode will initially compile the TypeScript into JavaScript and start the JavaScript application. It will then monitor for changes to both the TypeScript and Javascript, when there are any changes the app will be recompiled and restarted. To start the application in watch mode run the code below.

```bash
npm run watch
```

<a name="running-the-application"></a>

#### Running the application

To run the application normally, ensure the TypeScript has already been built. To start the application run the code below.

```bash
npm start
```

<a name="functionality"></a>

### Functionality

<a name="expressjs-application"></a>

#### ExpressJS application

Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.

The Express application is set up in the `server` file. You will notice that when running, the application will be made available on the port number defined in the `PORT` environment variable or port `3000` by default. The app also has a number of body parsers which can be enabled in the "Set up Express framework" section, currently only the JSON body parser is turned on.

<a name="typescript"></a>

#### TypeScript

TypeScript is basically just JavaScript plus some additional features. TypeScript allows you to assign variable types while developing your code, and will check those variable types while you develop. When developing in TypeScript, all your code is stored in `.ts` files, you then need to compile this code and it will be converted to JavaScript (`.js`). For this project, all TypeScript is found in `src/` and all JavaScript is found in `build/` (the TypeScript must be built in order to see this). The compiled JavaScript is used when running the app.

Check out this <a href="https://www.typescriptlang.org/docs/handbook/TypeScript-in-5-minutes.html">TypeScript in 5 minutes tutorial</a> for a quick overview of how it works.

Please not that when you install a new module, you will usually need to also install the model's types so that TypeScript will work. As an example, if you were installing the `express` module you would need to run the code below to install both the `express` module and its types.

```bash
npm install express --save
npm install @types/express --save-dev
```

When you further develop this application, ensure you **always** develop in TypeScript, then compile to JavaScript using the scripts explained in this README. This project inclues some custom TypeScript models, these can be found in `config/models/`. Custom types may also need to be declared for modules which do not have an associated `@types` module. These declaration files are stored in `src/@types` and will not be compiled into JavaScript as they are only needed for development.

<a name="example-routes-and-functions"></a>

#### Example routes and functions

This project includes some examples of API routes and custom functions that are used by those routes. These examples show you how you can structure your own routes and functions.

The example routes can be found in `routes/` and the example functions can be found in `services/`, there are also other functions in `utils/` but these are used by the app as utilities. Remember when you create a route, you need to tell your Express app to use it, this is done in the "Set up Express framework" section of the `server` file.

When you write your own functions, each function must be exported (using named or default exports) so that it can be used by other parts of the application. You can have multiple named exports (`export ...`) in a file. To import these in another file import the specific exports you want in an object.

```JavaScript
// Import specific named exports from services/exampleFunctions
import {
  addRandomNumbers,
  subtractRandomNumbers
} from "../services/exampleFunctions";
addRandomNumbers();

// Import all named exports from services/exampleFunctions as exampleFunctions
import * as exampleFunctions from "../services/exampleFunctions";
exampleFunctions.addNumbers(1, 4);
```

<sup>Note that named exports have **not** been set up in this code repository.</sup>

On the other hand, you can only have one default export (`export default ...`) per file. This export can be a function, a class, an object or anything else. Importing the default export in another file will import whatever you have exported as a variable name that you choose.

```JavaScript
// Import default export from services/exampleFunctions as exampleFunctions
import exampleFunctions from "../services/exampleFunctions";
exampleFunctions.addNumbers(1, 4);
```

<a name="npm-scripts"></a>

#### NPM scripts

The `package.json` file includes some custom scripts that you will need to use when developing and running the application. The following scripts are defined:

- `build`: build the TypeScript files in the `src` folder
- `clean-build`: delete the current build in the `build` folder then build the TypeScript files in the `src` folder
- `start`: start the application by running the pre-built JavaScript
- `test`: run the mocha test suite on the pre-built JavaScript
- `build-test`: build the TypeScript files in the `src` folder then run the mocha test suite
- `watch-ts`: watch for any changes in the TypeScript files, if there are changes build the TypeScript files in the `src` folder
- `watch-js`: start the application and watch for any changes in the JavaScript files, if there are changes restart the application
- `watch`: start the application and watch for any changes in both the TypeScript and JavaScript files, if there are changes build the TypeScript files in the `src` folder and restart the application

<a name="loading-environment-variables"></a>

#### Loading environment variables

When running the application environment variables are loaded from a local `.env` file stored in the app root directory. If this file does not exist, then nothing will be loaded. A sample env file has been included in this repository called `sample.env`, it contains all the environment variables required by the application. To use this file it must be renamed to `.env`. Note that the `.env` file should not be hosted anywhere publically (as it contains sensitive information) so do not commit it to the repository.

<a name="logging-and-request-tracing"></a>

#### Logging and request tracing

Logging is done in this application using the Winston module. There are 6 levels of logs:

- 0: error
- 1: warn
- 2: info
- 3: verbose
- 4: debug
- 5: silly

The configuration for the logger is in `config/winston` where there are currently 3 defined log transports. These are explained in the table below. Note that log level means that logs with the level stated and above only are output.

| #   | Level                            | Structure                                                                                                         | Format                |
| --- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- |
| 1   | LOG_LEVEL (environment variable) | \<timestamp\> [\<logLevel\>] \<message\>                                                                          | Console               |
| 2   | info                             | { traceID: \<traceID\>, timestamp: \<timestamp\>, level: \<level\>, message: \<message\>, ...\<other metadata\> } | File (logs/app.log)   |
| 3   | debug                            | { traceID: \<traceID\>, timestamp: \<timestamp\>, level: \<level\>, message: \<message\>, ...\<other metadata\> } | File (logs/debug.log) |

To use the logger ensure that you import the `config/winston` default export. You can then create a log by using the log level method and inputting a message.

```javascript
// Import logger
import winston from "./config/winston";

// Create an info log
winston.info("Hello world!");
```

You can also input other metadata that you want to appear in the file logs (this data does not display in the console logs).

```javascript
// Create a warning log with metadata
winston.warn("This is a warning...", { data: [1, 2, 3] });
```

When logs are produced related to an API request, it is a good idea to attach a trace ID to the request and use this in the logs. This allows you to be aware of which logs are related to the request and can be useful for troubleshooting purposes. The trace ID is created using the `middlewares/logging` middleware and attached to the request using the `express-http-context` module. This module allows you to access the trace ID from anywhere in the application that doesn't have access to the Express `req` object.

Note that the `traceID` fields are optional in the log output and are only present when the log is related to an API call.

This application is set up to automatically log the following information:

- Application start up
- API request received (including the corresponding data)
- API request complete (including response time)

<a name="input-validation"></a>

#### Input validation

<a name="error-handling"></a>

API input validation is done using the `express-validator` module. All validation logic is stored in `middlewares/validation` and then imported in the necessary routes. When you are writing the code for your routes, ensure to include `validationResult(req).throw();` as soon as possible so that an error will be thrown if an input is invalid. It should also be noted that the error handler will concatenate the field name with the message that has been defined for the validation. In the example below, if `x` is a string, the error message would be `"x must be a number"`.

```javascript
/* middlewares/validation */
export const exampleAddXY = [
  param("x")
    .isNumeric()
    .withMessage("must be a number"),
  param("y")
    .isNumeric()
    .withMessage("must be a number"),
];

/* routes/example */
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

    // Rest of code here
  } catch (err) {
    next(err);
  }
});
```

The `express-validator` module can also be used to perform input sanitisation, but that hasn't been covered in this boilerplate.

More information on how `express-validator` is configured can be found in the <a href="https://express-validator.github.io/docs/">documentation</a> and at the <a href="https://github.com/chriso/validator.js">validator.js GitHub</a>.

#### Error handling

This application contains two error handling middlewares and they are defined in `middlewares/errors` and used in `server`. The first error handler catches all API routes which are not found and returns 404. The second error handler catches invalid API inputs and any exceptions that occur within the applcication.

<a name="testing"></a>

#### Testing

Tests should be written for custom functions that do not rely on external dependencies. This application uses a combination of <a href="https://mochajs.org/">Mocha</a>, <a href="https://sinonjs.org/">Sinon</a> and <a href="https://www.chaijs.com/">Chai</a> for the test framework. All test scripts are in the `tests/` folder and can be run using the `npm run test` (if the TypeScript is already built) or `npm run build-test` commands.

<a name="cors"></a>

#### CORS

A request for a resource (like an image or a font) outside of the origin is known as a cross-origin request. CORS (cross-origin resource sharing) manages cross-origin requests. Cross-origin requests mean that servers must implement ways to handle requests from origins outside of their own. CORS allows servers to specify who (i.e., which origins) can access the assets on the server, among many other things.

In other words, CORS allows applications that are not on the domain of your application server to access your application. This application has CORS enabled.

<a name="openapi-documentation"></a>

#### OpenAPI Documentation

OpenAPI Specification (formerly Swagger Specification) is an API description format for REST APIs. It allows you to describe things like available endpoints, operations on each endpoint, inputs and outputs, authentication methods and more. A YAML file has been included in this repository (`swagger.yaml`) as an example. This YAML file is referred to from the `server` file so that the user can access the documentation when the application is running. To view the OpenAPI documentation, start the application (`npm start`) and navigate to <a href="localhost:3000/api-docs">localhost:\<PORT\>/api-docs</a>.

<a name="important"></a>

### Important

- This application was built in NodeJS 10.15.0
- API key functionality has not been built in this boilerplate

<a name="future-improvements"></a>

### Future improvements

- [ ] API versioning
- [ ] Git hook to run Prettier

---
