import { describe, test } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { asMatrix } from "./asMatrix.ts";

describe("asMatrix", () => {
  test("don't throw when empty string", () => {
    expect(asMatrix("")).toEqual([[]]);
  });

  test("should create a matrix starting from a string", () => {
    const str = `ABC
DEF
GHI`;
    expect(asMatrix(str)).toEqual([
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ]);
  });
});
