import { hello } from ".";

describe("hello", () => {
  it("Should return greetings", () => {
    expect(hello()).toBe("world!");
  });
});
