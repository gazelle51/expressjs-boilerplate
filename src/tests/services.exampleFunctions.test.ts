import chai from "chai";
import sinon from "sinon";

// Chai set up
const expect = chai.expect;

// Module to text
import exampleFunctions from "../services/exampleFunctions";

describe("services::exampleFunctions::addRandomNumbers", () => {
  it("should add 3 and 6", () => {
    // Stubs
    let random = sinon.stub(Math, "random");
    random
      .onCall(0)
      .returns(0.3)
      .onCall(1)
      .returns(0.6)
      .returns(0);

    expect(exampleFunctions.addRandomNumbers().add).to.eql(9);
  });
});

describe("services::exampleFunctions::subtractRandomNumbers", () => {
  it("should subtract 5 from -9", () => {
    // Stubs
    let random = sinon.stub(Math, "random");
    random
      .onCall(0)
      .returns(-0.9)
      .onCall(1)
      .returns(0.5)
      .returns(0);

    expect(exampleFunctions.subtractRandomNumbers().subtract).to.eql(-14);
  });
});

describe("services::exampleFunctions::addNumbers", () => {
  it("should add 3 and 6", () => {
    expect(exampleFunctions.addNumbers(3, 6).add).to.eql(9);
  });
});

describe("services::exampleFunctions::subtractNumbers", () => {
  it("should subtract 5 from -9", () => {
    expect(exampleFunctions.subtractNumbers(-9, 5).subtract).to.eql(-14);
  });
});

afterEach(function() {
  // Restore sinon
  sinon.restore();
});
