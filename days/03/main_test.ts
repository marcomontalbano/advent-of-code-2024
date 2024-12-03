import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { day03_part1, parseProgram } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 3: Mull It Over", () => {
  test("parseProgram", () => {
    expect(parseProgram(txtExample)).toEqual([
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ]);
  });

  test("Part 1 • Example", () => {
    expect(day03_part1(txtExample)).toEqual(161);
  });

  test("Part 1", () => {
    expect(day03_part1(txtInput)).toEqual(189600467);
  });
});
