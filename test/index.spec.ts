import { hello } from "./../src";
import { expect } from "chai";

describe("hello", () => {
  it("Should return greetings", () => {
    expect(hello()).equals("world!");
  });
});
