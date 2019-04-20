## Express Boilerplate <!-- omit in toc -->

Microservice project with ExpressJS on NodeJS

![Platform](https://img.shields.io/badge/platform-NODE-lightgrey.svg?style=flat)

### Table of Contents <!-- omit in toc -->

- [Summary](#summary)
- [Functionality](#functionality)
  - [ExpressJS application](#expressjs-application)
  - [TypeScript](#typescript)
  - [Example routes and functions](#example-routes-and-functions)
  - [Test, debug, dev and prod NodeJS scripts](#test-debug-dev-and-prod-nodejs-scripts)
  - [Loading environment variables](#loading-environment-variables)
  - [Logging and request tracing](#logging-and-request-tracing)
  - [Input validation](#input-validation)
  - [Error handling](#error-handling)
  - [Testing](#testing)
  - [CORS](#cors)
- [Requirements](#requirements)
- [Run](#run)
  - [Installing the application](#installing-the-application)
  - [Test mode](#test-mode)
  - [Debug mode](#debug-mode)
  - [Development mode](#development-mode)
  - [Production mode](#production-mode)
- [Endpoints](#endpoints)
- [Important](#important)
- [Future improvements](#future-improvements)

<a name="summary"></a>

### Summary

A microservices is an individual component of an application that follows the microservice architecture - an architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities. The microservice exposes a RESTful API.

<a name="functionality"></a>

### Functionality

The project contains the functionality listed below.

- ExpressJS application
- TypeScript
- Example middlewares, routes and functions
- Test, debug, dev and prod NodeJS scripts
- Loading environment variables
- Logging and request tracing
- Input validation
- Error handling
- Testing
- CORS

<a name="expressjs-application"></a>

#### ExpressJS application

Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.

The Express application is set up in the `server` file. You will notice that when running, the application will be made available on the `PORT` number defined in the environment variables or port `3000`. The app also has a number of body parsers which can be enabled in the `Set up Express framework` section, currently only the JSON body parser is turned on.

<a name="typescript"></a>

#### TypeScript

TypeScript is basically just JavaScript plus some additional features. TypeScript allows you to assign variable types while developing your code, and will check those variable types while you develop. When developing in TypeScript, all your code is stored in `.ts` files, you then need to compile this code and it will be converted to JavaScript (`.js`). For this project, all TypeScript is found in `src/` and all JavaScript is stored in `build/`. The compiled JavaScript is used when running the app.

Check out this <a href="https://www.typescriptlang.org/docs/handbook/TypeScript-in-5-minutes.html">TypeScript in 5 minutes tutorial</a> for a quick overview of how it works.

Please not that when you install a new module, you will usually need to also install the model's types so that TypeScript will work. As an example, if you were installing the `express` module you would need to run the code below to install both the `express` module and its types.

```bash
npm install express --save
npm install @types/express --save-dev
```

When you further develop this application, ensure you **always** develop in TypeScript, then compile to JavaScript using the scripts explained in this README. This project inclues some custom TypeScript models, these can be found in `config/models/`. Custom types may also need to be declared for modules which do not have an associated `@types` module. These declaration files are stored in `src/@types` and will not be compiled into JavaScript as they are only needed for development.

<a name="example-routes-and-functions"></a>

#### Example routes and functions

This project includes some examples of API routes and custom functions that are used by the routes. These examples show you how you can structure your own routes and functions.

The example routes can be found in `routes/` and the example functions can be found in `services/`, there are also other functions in `utils/` but these are used by the app as utilities. Remember when you create a route, you need to tell your Express app to use it, this is done in the `Set up Express framework` section of the `server` file.

When you write your own functions, each function must be exported (using named and default exports) so that it can be used by other parts of the application. You can have multiple named exports (`export ...`) in a file. To import these in another file import the specific exports you want in an object.

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

On the other hand, you can only have one default export (`export default ...`) per file. This export can be a function, a class, an object or anything else. Importing the default export in another file will import whatever you have exported as a variable name that you choose.

```JavaScript
// Import default export from services/exampleFunctions as exampleFunctions
import exampleFunctions from "../services/exampleFunctions";
exampleFunctions.addNumbers(1, 4);
```

<a name="test-debug-dev-and-prod-nodejs-scripts"></a>

#### Test, debug, dev and prod NodeJS scripts

The `package.json` file includes some custom scripts that you will need to use when developing and running the application. The following scripts are defined:

- `start`: start the application with environment variable `NODE_ENV="production"`
- `test`: run the `jest` test suite with environment variable `NODE_ENV="test"`
- `watch-ts`: watch for any changes in the TypeScript files, if there are changes compile to JavaScript
- `watch-env-dev`: start the application with environment variable `NODE_ENV="development"` and watch for any changes in the JavaScript files, if there are changes restart the application
- `watch-env-debug`: start the application with environment variable `NODE_ENV="debug"` and watch for any changes in the JavaScript files, if there are changes restart the application
- `watch`: start the application with environment variable `NODE_ENV="development"` and watch for any changes in both the TypeScript and JavaScript files, if there are changes recompile and restart the application
- `watch-debug`: start the application with environment variable `NODE_ENV="debug"` and watch for any changes in both the TypeScript and JavaScript files, if there are changes recompile and restart the application

The scripts you will use most often when developing are `watch` and `watch-debug`.

<a name="loading-environment-variables"></a>

#### Loading environment variables

When running the application in debug or development mode the environment variables are loaded from a local `.env` file stored in the app root directory. The `.env` file should not be hosted anywhere publically (as it contains sensitive information) and hence an example is not included in this repository. If you are running the application in production mode the environment variables will not be loaded from an `.env` file as it is expected they are already exposed in the environment. The `.env` file is also not loaded in test mode as the tests should not rely on external dependencies. If you need to use an environment variable in test mode you can use the `rewire` module to temporarily create it within the test scope.

<a name="logging-and-request-tracing"></a>

#### Logging and request tracing

Logging is done in this application using the `Winston` module. There are 6 levels of logs:

- 0: error
- 1: warn
- 2: info
- 3: verbose
- 4: debug
- 5: silly

The configuration for the logger is in `config/winston`. The `NODE_ENV` environment variable determines which level and logging configs are used. Note that log level means that logs with the level stated and above are output.

| NODE_ENV    | Log level | Log format                                                                                       | Log output |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ | ---------- |
| debug       | debug     | \<timestamp\> - [\<level\>]: [traceID: \<traceID\>]) \<message\>                                 | Console    |
| debug       | debug     | {traceID: \<traceID\>, unixTimestamp: \<unixTimestamp\>, level: \<level\>, message: \<message\>} | File       |
| test        | info      | \<timestamp\> - [\<level\>]: [traceID: \<traceID\>]) \<message\>                                 | Console    |
| test        | info      | {traceID: \<traceID\>, unixTimestamp: \<unixTimestamp\>, level: \<level\>, message: \<message\>} | File       |
| development | info      | \<timestamp\> - [\<level\>]: [traceID: \<traceID\>]) \<message\>                                 | Console    |
| development | info      | {traceID: \<traceID\>, unixTimestamp: \<unixTimestamp\>, level: \<level\>, message: \<message\>} | File       |
| production  | info      | {traceID: \<traceID\>, unixTimestamp: \<unixTimestamp\>, level: \<level\>, message: \<message\>} | File       |

To use the logger ensure that you import the `config/winston` default export. You can then create a log by using the log level method and inputting a message.

```javascript
// Import logger
import winston from "./config/winston";

// Create an info log
winston.info("Hello world!");
```

When logs are produced related to an API request, it is a good idea to attach a trace ID to the request and use this in the logs. This allows you to be aware of which logs are related to the request and can be useful for troubleshooting purposes. The trace ID is created using the `middlewares/logging` middleware and attached to the request using the `express-http-context` module. This module allows you to access the trace ID from anywhere in the application that doesn't have access to the Express `req` object.

Note that the `traceID` fields are optional in the log output and are only present when the log is related to an API call.

This application is set up to automatically log the following information:
* Application start up messages
* API request received
* Data sent with API request
* API request complete

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
    .withMessage("must be a number")
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

Tests should be written for custom functions that do not rely on external dependencies. This application uses <a href="https://jestjs.io/">jest</a> for the test framework. All test scripts are in the `tests/` folder and can be run using the `npm run test` command.

If you're test requires an environment variable or an external dependency result use the `rewire` module to temporarily override a variable within the test scope. You can read the <a href="https://www.npmjs.com/package/rewire">documentation</a> for examples.

<a name="cors"></a>

#### CORS

A request for a resource (like an image or a font) outside of the origin is known as a cross-origin request. CORS (cross-origin resource sharing) manages cross-origin requests. Cross-origin requests mean that servers must implement ways to handle requests from origins outside of their own. CORS allows servers to specify who (i.e., which origins) can access the assets on the server, among many other things.

In other words, CORS allows applications that are not on the domain of your application server to access your application. This application has CORS enabled.

<a name="requirements"></a>

### Requirements

#### Local Development Tools Setup <!-- omit in toc -->

- Install a code editor such as <a href="https://code.visualstudio.com/download">VS Code</a>
- Install the latest [NodeJS](https://nodejs.org/en/download/) 6+ LTS version

<a name="run"></a>

### Run

<a name="installing-the-application"></a>

#### Installing the application

To install the application navigate to the app root directory in the command line. Run the following code:

```bash
npm install
```

This will install the application dependencies in the local node_modules folder. Once complete, the application can be run using one of the node scripts. Your application will run at: `localhost:<PORT>/`.

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

<a name="test-mode"></a>

#### Test mode

To run the application's tests, run the code below. If all the tests return `PASS` then the tests were successful.

```bash
npm run test
```

<a name="debug-mode"></a>

#### Debug mode

Running the application in debug mode will use debug level logging and set `NODE_ENV = "debug"`. It was also watch for changes to both TypeScript and Javascript, when there are any changes the app will be recompiled and restarted. To start the application in debug mode run the code below.

```bash
npm run watch-debug
```

<a name="development-mode"></a>

#### Development mode

Running the application in development mode will use info level logging and set `NODE_ENV = "development"`. It was also watch for changes to both TypeScript and Javascript, when there are any changes the app will be recompiled and restarted. To start the application in development mode run the code below.

```bash
npm run watch
```

<a name="production-mode"></a>

#### Production mode

Running the application in production mode will use info level logging and set `NODE_ENV = "production"`. To start the application in production mode run the code below.

```bash
npm start
```

<a name="endpoints"></a>

### Endpoints

The endpoints described in the table below are available in this boilerplate application.

| Endpoint                          | Method | Description                            | Params                                                    | Body | Response Type |
| :-------------------------------- | :----- | :------------------------------------- | :-------------------------------------------------------- | :--- | :------------ |
| `/`                               | GET    | API landing page                       | N/A                                                       | N/A  | JSON          |
| `api/v1`                          | GET    | API version 1 landing page             | N/A                                                       | N/A  | JSON          |
| `api/v1/example/add/random`       | GET    | Add 2 randomly generated numbers       | N/A                                                       | N/A  | JSON          |
| `api/v1/example/subtract/random`  | GET    | Subtract 2 randomly generated numbers  | N/A                                                       | N/A  | JSON          |
| `api/v1/example/add/{x}/{y}`      | GET    | Add 2 numbers                          | x: first number to add <br>y: second number to add        | N/A  | JSON          |
| `api/v1/example/subtract/{x}/{y}` | GET    | Subtract 2 numbers                     | x: number to be subtracted from <br>y: number to subtract | N/A  | JSON          |
| `api/v1/example/logs`             | GET    | Examples of different logging levels   | N/A                                                       | N/A  | JSON          |
| `api/v1/example/error`            | GET    | Example of an error in the application | N/A                                                       | N/A  | JSON          |

<a name="important"></a>

### Important

- This application was built in NodeJS 10.15.0
- API key functionality has not been built in this boilerplate

<a name="future-improvements"></a>

### Future improvements

- [ ] API versioning  
- [ ] API documentation with Swagger  
- [ ] Git hook to run Prettier  
- [ ] Use for Windows and Mac/Linux devs  

---
