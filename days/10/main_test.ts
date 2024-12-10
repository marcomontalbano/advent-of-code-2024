import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { findZeros, hike, runProgram_part1 } from "./main.ts";
import { asMatrix } from "../../utils/asMatrix.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 10: Hoof It", () => {
  test("findZeros", () => {
    const matrix = asMatrix(txtExample, Number);
    expect(findZeros(matrix)).toEqual([
      { col: 2, row: 0 },
      { col: 4, row: 0 },
      { col: 4, row: 2 },
      { col: 6, row: 4 },
      { col: 2, row: 5 },
      { col: 5, row: 5 },
      { col: 0, row: 6 },
      { col: 6, row: 6 },
      { col: 1, row: 7 },
    ]);
  });

  test("hike", () => {
    expect(
      hike(
        [
          [0, 1, 2],
          [9, 1, 3],
          [8, 1, 4],
          [7, 6, 5],
        ],
        { col: 0, row: 0 },
      ),
    ).toEqual([
      { col: 0, row: 1 },
    ]);

    expect(
      hike(
        [
          [0, 1, 2, 1],
          [9, 4, 3, 0],
          [8, 5, 4, 8],
          [7, 6, 5, 8],
        ],
        { col: 0, row: 0 },
      ),
    ).toEqual([
      { col: 0, row: 1 },
      { col: 0, row: 1 },
      { col: 0, row: 1 },
    ]);
  });

  test("Part 1 • Example", () => {
    expect(runProgram_part1(txtExample)).toEqual(36);
  });

  test("Part 1", () => {
    expect(runProgram_part1(txtInput)).toEqual(717);
  });
});
