"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("../config/winston"));
/**
 * Load environment variables for dev environment.
 * @function
 */
exports.loadEnvironmentVariables = () => {
    try {
        winston_1.default.debug("utils/environmentVariables/loadEnvironmentVariables");
        // Load .env file
        if (fs_1.default.existsSync(path_1.default.join(app_root_path_1.default.toString(), ".env"))) {
            winston_1.default.debug("Loading local .env file");
            require("dotenv").config({ path: path_1.default.join(app_root_path_1.default.toString(), ".env") });
            return;
        }
        else {
            throw new Error(`.env file does not exist in app root directory`);
        }
    }
    catch (err) {
        throw new Error(`error loading environment variables, message: ${err.message}`);
    }
};
exports.default = { loadEnvironmentVariables: exports.loadEnvironmentVariables };
//# sourceMappingURL=environmentVariables.js.map