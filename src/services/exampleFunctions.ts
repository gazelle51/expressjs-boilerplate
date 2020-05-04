import winston from "../config/winston";
import {
  RandomNumbers,
  AddTwoNumbers,
  SubtractTwoNumbers,
} from "../config/models/Example";

/**
 * Add 2 randomly generated numbers.
 */
export const addRandomNumbers = (): AddTwoNumbers => {
  let output: AddTwoNumbers;
  let random: RandomNumbers;

  try {
    winston.debug("services/exampleFunctions/addRandomNumbers");

    random = randomNumbers();

    output = {
      x: random.x,
      y: random.y,
      add: random.x + random.y,
    };

    return output;
  } catch (err) {
    throw new Error(`error adding random numbers: ${err.message}`);
  }
};

/**
 * Subtract 2 randomly generated numbers.
 */
export const subtractRandomNumbers = (): SubtractTwoNumbers => {
  let output: SubtractTwoNumbers;
  let random: RandomNumbers;

  try {
    winston.debug("services/exampleFunctions/subtractRandomNumbers");

    random = randomNumbers();

    output = {
      x: random.x,
      y: random.y,
      subtract: random.x - random.y,
    };

    return output;
  } catch (err) {
    throw new Error(`error subtracting random numbers: ${err.message}`);
  }
};

/**
 * Add 2 numbers.
 * @param x - First number to add
 * @param y - Second number to add
 */
export const addNumbers = (x: number, y: number): AddTwoNumbers => {
  let output: AddTwoNumbers;

  try {
    winston.debug("services/exampleFunctions/addNumbers");

    output = {
      x: x,
      y: y,
      add: x + y,
    };

    return output;
  } catch (err) {
    throw new Error(`error adding numbers: ${err.message}`);
  }
};

/**
 * Subtract 2 numbers.
 * @param x - Number to be subtracted from
 * @param y - Number to subtract
 */
export const subtractNumbers = (x: number, y: number): SubtractTwoNumbers => {
  let output: SubtractTwoNumbers;

  try {
    winston.debug("services/exampleFunctions/subtractNumbers");

    output = {
      x: x,
      y: y,
      subtract: x - y,
    };

    return output;
  } catch (err) {
    throw new Error(`error subtracting numbers: ${err.message}`);
  }
};

/**
 * Generate 2 numbers.
 */
let randomNumbers = (): RandomNumbers => {
  let output: RandomNumbers;
  let x: number;
  let y: number;

  try {
    winston.debug("services/exampleFunctions/randomNumbers");

    x = Math.random() * 10;
    y = Math.random() * 10;

    output = {
      x: x,
      y: y,
    };

    return output;
  } catch (err) {
    throw new Error(`error generating random numbers: ${err.message}`);
  }
};

export default {
  addRandomNumbers,
  subtractRandomNumbers,
  addNumbers,
  subtractNumbers,
};
