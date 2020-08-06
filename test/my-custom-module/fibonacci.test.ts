import { fibonacci } from "../../src/my-custom-module/fibonacci";
import { expect } from "chai";

describe("fibonacci", () => {
  it("Should return 1 when 2 is given", () => {
    expect(fibonacci(2)).to.be.equal(1);
  });
  it("Should return 56 when 10 is given", () => {
    expect(fibonacci(10)).to.be.equal(56);
  });
  it("Should return 75026 when 25 is given", () => {
    expect(fibonacci(25)).to.be.equal(75026);
  });
});
