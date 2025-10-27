import { fibonacci } from "./fibonacci";

describe("fibonacci", () => {
  it("Should return 1 when 2 is given", () => {
    expect(fibonacci(2)).toBe(1);
  });
  it("Should return 56 when 10 is given", () => {
    expect(fibonacci(10)).toBe(56);
  });
  it("Should return 75026 when 25 is given", () => {
    expect(fibonacci(25)).toBe(75026);
  });
});
