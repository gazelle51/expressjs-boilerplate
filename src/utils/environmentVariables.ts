import appRoot from "app-root-path";
import fs from "fs";
import path from "path";
import winston from "../config/winston";

/**
 * Load environment variables for dev environment.
 * @function
 */
export const loadEnvironmentVariables = (): null => {
  try {
    winston.debug("utils/environmentVariables/loadEnvironmentVariables");

    // Load .env file
    if (fs.existsSync(path.join(appRoot.toString(), ".env"))) {
      winston.debug("Loading local .env file");
      require("dotenv").config({ path: path.join(appRoot.toString(), ".env") });
      return;
    } else {
      throw new Error(`.env file does not exist in app root directory`);
    }
  } catch (err) {
    throw new Error(
      `error loading environment variables, message: ${err.message}`
    );
  }
};

export default { loadEnvironmentVariables };
