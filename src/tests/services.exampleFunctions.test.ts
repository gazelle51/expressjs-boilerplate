import rewire from "rewire";
const exampleFunctions = rewire("../services/exampleFunctions");

/**
 * Test addRandomNumbers.
 */
test("Add 3 and 6", async () => {
  // Rewire exampleFunctions.randomNumbers function so that the numbers we add are fixed
  exampleFunctions.__set__("randomNumbers", () => {
    return {
      x: 3,
      y: 6,
    };
  });

  // Run test
  expect(exampleFunctions.addRandomNumbers().add).toEqual(9);
});

/**
 * Test subtractRandomNumbers.
 */
test("Subtract 5 from -9", async () => {
  // Rewire exampleFunctions.randomNumbers function so that the numbers we add are fixed
  exampleFunctions.__set__("randomNumbers", () => {
    return {
      x: -9,
      y: 5,
    };
  });

  // Run test
  expect(exampleFunctions.subtractRandomNumbers().subtract).toEqual(-14);
});

/**
 * Test addNumbers.
 */
test("Add 3 and 6", async () => {
  // Run test
  expect(exampleFunctions.addNumbers(3, 6).add).toEqual(9);
});

/**
 * Test subtractRandomNumbers.
 */
test("Subtract 5 from -9", async () => {
  // Run test
  expect(exampleFunctions.subtractNumbers(-9, 5).subtract).toEqual(-14);
});
