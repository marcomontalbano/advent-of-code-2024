import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import {
  newArray,
  parseInput,
  runProgram_part1,
  toDenseFormat,
} from "./main.ts";
import { compact } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 9: Disk Fragmenter", () => {
  test("parseInput", () => {
    expect(parseInput(txtExample)).toEqual([
      2,
      3,
      3,
      3,
      1,
      3,
      3,
      1,
      2,
      1,
      4,
      1,
      4,
      1,
      3,
      1,
      4,
      0,
      2,
    ]);
  });

  test("newArray", () => {
    expect(newArray(5, 1)).toEqual([1, 1, 1, 1, 1]);
    expect(newArray(3, ".")).toEqual([".", ".", "."]);
    expect(newArray(undefined, ".")).toEqual([]);
  });

  test("toDenseFormat", () => {
    expect(toDenseFormat([1, 2, 3, 4, 5])).toEqual(
      [0, ".", ".", 1, 1, 1, ".", ".", ".", ".", 2, 2, 2, 2, 2],
    );

    const diskMap = parseInput(txtExample);
    expect(toDenseFormat(diskMap)).toEqual(
      [
        0,
        0,
        ".",
        ".",
        ".",
        1,
        1,
        1,
        ".",
        ".",
        ".",
        2,
        ".",
        ".",
        ".",
        3,
        3,
        3,
        ".",
        4,
        4,
        ".",
        5,
        5,
        5,
        5,
        ".",
        6,
        6,
        6,
        6,
        ".",
        7,
        7,
        7,
        ".",
        8,
        8,
        8,
        8,
        9,
        9,
      ],
    );
  });

  test("compact", () => {
    expect(compact(toDenseFormat([1, 2, 3, 4, 5]))).toEqual(
      [0, 2, 2, 1, 1, 1, 2, 2, 2, ".", ".", ".", ".", ".", "."],
    );

    const diskMap = parseInput(txtExample);
    const denseFormat = toDenseFormat(diskMap);
    expect(compact(denseFormat)).toEqual(
      [
        0,
        0,
        9,
        9,
        8,
        1,
        1,
        1,
        8,
        8,
        8,
        2,
        7,
        7,
        7,
        3,
        3,
        3,
        6,
        4,
        4,
        6,
        5,
        5,
        5,
        5,
        6,
        6,
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
      ],
    );
  });

  test("Part 1 • Example", () => {
    expect(runProgram_part1(txtExample)).toEqual(1928);
  });

  test("Part 1", () => {
    expect(runProgram_part1(txtInput)).toEqual(6337921897505);
  });
});
