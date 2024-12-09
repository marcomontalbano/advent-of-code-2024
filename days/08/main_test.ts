import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { calculateAntinodes, findAntennas, runProgram_part1 } from "./main.ts";
import { asMatrix } from "../../utils/asMatrix.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 8: Resonant Collinearity", () => {
  test("findAntennas", () => {
    const matrix = asMatrix(txtExample);
    expect(findAntennas(matrix)).toEqual(
      new Map([
        ["0", [
          { x: 8, y: 1 },
          { x: 5, y: 2 },
          { x: 7, y: 3 },
          { x: 4, y: 4 },
        ]],
        ["A", [
          { x: 6, y: 5 },
          { x: 8, y: 8 },
          { x: 9, y: 9 },
        ]],
      ]),
    );
  });

  test("calculateAntinodes", () => {
    expect(calculateAntinodes({ x: 4, y: 4 }, { x: 5, y: 6 })).toEqual([
      { x: 3, y: 2 }, // this is ok
      { x: 6, y: 8 }, // this is ok
    ]);

    expect(calculateAntinodes({ x: 4, y: 4 }, { x: 8, y: 5 })).toEqual([
      { x: 0, y: 3 }, // this is ok
      { x: 12, y: 6 },
    ]);

    expect(calculateAntinodes({ x: 8, y: 5 }, { x: 5, y: 6 })).toEqual([
      { x: 11, y: 4 },
      { x: 2, y: 7 }, // this is ok
    ]);
  });

  test("Part 1 • Example", () => {
    expect(runProgram_part1(txtExample)).toEqual(14);
  });

  test("Part 1", () => {
    expect(runProgram_part1(txtInput)).toEqual(318);
  });
});
