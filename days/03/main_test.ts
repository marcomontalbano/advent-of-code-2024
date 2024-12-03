import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { parseProgram_part1, parseProgram_part2, runProgram } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 3: Mull It Over", () => {
  test("Part 1 • parseProgram", () => {
    expect(parseProgram_part1("")).toEqual([]);

    expect(parseProgram_part1(txtExample)).toEqual([
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ]);
  });

  test("Part 1 • Example", () => {
    const input = parseProgram_part1(txtExample);
    expect(runProgram(input)).toEqual(161);
  });

  test("Part 1", () => {
    const input = parseProgram_part1(txtInput);
    expect(runProgram(input)).toEqual(189600467);
  });

  test("Part 2 • parseProgram", () => {
    expect(parseProgram_part2("")).toEqual([]);

    expect(parseProgram_part2(txtExample)).toEqual([
      [2, 4],
      [8, 5],
    ]);
  });

  test("Part 2 • Example", () => {
    const input = parseProgram_part2(txtExample);
    expect(runProgram(input)).toEqual(48);
  });

  test("Part 2", () => {
    const input = parseProgram_part2(txtInput);
    expect(runProgram(input)).toEqual(107069718);
  });
});
