"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rewire_1 = __importDefault(require("rewire"));
const exampleFunctions = rewire_1.default("../services/exampleFunctions");
/**
 * Test addRandomNumbers.
 */
test("Add 3 and 6", () => __awaiter(this, void 0, void 0, function* () {
    // Rewire exampleFunctions.randomNumbers function so that the numbers we add are fixed
    exampleFunctions.__set__("randomNumbers", () => {
        return {
            x: 3,
            y: 6
        };
    });
    // Run test
    expect(exampleFunctions.addRandomNumbers().add).toEqual(9);
}));
/**
 * Test subtractRandomNumbers.
 */
test("Subtract 5 from -9", () => __awaiter(this, void 0, void 0, function* () {
    // Rewire exampleFunctions.randomNumbers function so that the numbers we add are fixed
    exampleFunctions.__set__("randomNumbers", () => {
        return {
            x: -9,
            y: 5
        };
    });
    // Run test
    expect(exampleFunctions.subtractRandomNumbers().subtract).toEqual(-14);
}));
/**
 * Test addNumbers.
 */
test("Add 3 and 6", () => __awaiter(this, void 0, void 0, function* () {
    // Run test
    expect(exampleFunctions.addNumbers(3, 6).add).toEqual(9);
}));
/**
 * Test subtractRandomNumbers.
 */
test("Subtract 5 from -9", () => __awaiter(this, void 0, void 0, function* () {
    // Run test
    expect(exampleFunctions.subtractNumbers(-9, 5).subtract).toEqual(-14);
}));
//# sourceMappingURL=services.exampleFunctions.test.js.map