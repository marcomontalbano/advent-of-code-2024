import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { asMatrix } from "../../utils/asMatrix.ts";
import { findGuard, runProgram_part1, runProgram_part2 } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 6: Guard Gallivant", () => {
  test("findGuard", () => {
    expect(findGuard(txtExample)).toEqual({ rowIndex: 6, colIndex: 4 });

    expect(asMatrix(txtExample)[6][4]).toEqual("^");
  });

  test("Part 1 • Example", () => {
    expect(runProgram_part1(txtExample)).toEqual(41);
  });

  test("Part 1", () => {
    expect(runProgram_part1(txtInput)).toEqual(5564);
  });

  test("Part 2 • Example", () => {
    expect(runProgram_part2(txtExample)).toEqual(6);
  });

  test("Part 2", () => {
    expect(runProgram_part2(txtInput)).toEqual(1976);
  });
});
