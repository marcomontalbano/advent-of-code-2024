import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { parseProgram, runProgram_part1 } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 7: Bridge Repair", () => {
  test("Part 1 • Example", () => {
    expect(parseProgram(txtExample)).toEqual([
      { result: 190, numbers: [10, 19] },
      { result: 3267, numbers: [81, 40, 27] },
      { result: 83, numbers: [17, 5] },
      { result: 156, numbers: [15, 6] },
      { result: 7290, numbers: [6, 8, 6, 15] },
      { result: 161011, numbers: [16, 10, 13] },
      { result: 192, numbers: [17, 8, 14] },
      { result: 21037, numbers: [9, 7, 18, 13] },
      { result: 292, numbers: [11, 6, 16, 20] },
    ]);
  });

  test("Part 1 • Example", () => {
    expect(runProgram_part1(txtExample)).toEqual(3749);
  });

  test("Part 1", () => {
    expect(runProgram_part1(txtInput)).toEqual(20665830408335);
  });
});
