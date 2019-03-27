"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("../config/winston"));
/**
 * Add 2 randomly generated numbers.
 * @function
 */
exports.addRandomNumbers = () => {
    let output;
    let random;
    try {
        winston_1.default.debug("services/exampleFunctions/addRandomNumbers");
        random = randomNumbers();
        output = {
            x: random.x,
            y: random.y,
            add: random.x + random.y
        };
        return output;
    }
    catch (err) {
        throw new Error(`error adding random numbers: ${err.message}`);
    }
};
/**
 * Subtract 2 randomly generated numbers.
 * @function
 */
exports.subtractRandomNumbers = () => {
    let output;
    let random;
    try {
        winston_1.default.debug("services/exampleFunctions/subtractRandomNumbers");
        random = randomNumbers();
        output = {
            x: random.x,
            y: random.y,
            subtract: random.x - random.y
        };
        return output;
    }
    catch (err) {
        throw new Error(`error subtracting random numbers: ${err.message}`);
    }
};
/**
 * Add 2 numbers.
 * @function
 * @param x First number to add
 * @param y Second number to add
 */
exports.addNumbers = (x, y) => {
    let output;
    try {
        winston_1.default.debug("services/exampleFunctions/addNumbers");
        output = {
            x: x,
            y: y,
            add: x + y
        };
        return output;
    }
    catch (err) {
        throw new Error(`error adding numbers: ${err.message}`);
    }
};
/**
 * Subtract 2 numbers.
 * @function
 * @param x Number to be subtracted from
 * @param y Number to subtract
 */
exports.subtractNumbers = (x, y) => {
    let output;
    try {
        winston_1.default.debug("services/exampleFunctions/subtractNumbers");
        output = {
            x: x,
            y: y,
            subtract: x - y
        };
        return output;
    }
    catch (err) {
        throw new Error(`error subtracting numbers: ${err.message}`);
    }
};
/**
 * Generate 2 numbers.
 * @function
 */
let randomNumbers = () => {
    let output;
    let x;
    let y;
    try {
        winston_1.default.debug("services/exampleFunctions/randomNumbers");
        x = Math.random() * 10;
        y = Math.random() * 10;
        output = {
            x: x,
            y: y
        };
        return output;
    }
    catch (err) {
        throw new Error(`error generating random numbers: ${err.message}`);
    }
};
exports.default = {
    addRandomNumbers: exports.addRandomNumbers,
    subtractRandomNumbers: exports.subtractRandomNumbers,
    addNumbers: exports.addNumbers,
    subtractNumbers: exports.subtractNumbers
};
//# sourceMappingURL=exampleFunctions.js.map