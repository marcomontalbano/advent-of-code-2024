import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { parseProgram, runProgram_part1, runProgram_part2 } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 4: Ceres Search", () => {
  test("Part 1 • parseProgram", () => {
    expect(parseProgram("")).toEqual([[]]);

    expect(parseProgram(txtExample)).toEqual([
      [
        "M",
        "M",
        "M",
        "S",
        "X",
        "X",
        "M",
        "A",
        "S",
        "M",
      ],
      [
        "M",
        "S",
        "A",
        "M",
        "X",
        "M",
        "S",
        "M",
        "S",
        "A",
      ],
      [
        "A",
        "M",
        "X",
        "S",
        "X",
        "M",
        "A",
        "A",
        "M",
        "M",
      ],
      [
        "M",
        "S",
        "A",
        "M",
        "A",
        "S",
        "M",
        "S",
        "M",
        "X",
      ],
      [
        "X",
        "M",
        "A",
        "S",
        "A",
        "M",
        "X",
        "A",
        "M",
        "M",
      ],
      [
        "X",
        "X",
        "A",
        "M",
        "M",
        "X",
        "X",
        "A",
        "M",
        "A",
      ],
      [
        "S",
        "M",
        "S",
        "M",
        "S",
        "A",
        "S",
        "X",
        "S",
        "S",
      ],
      [
        "S",
        "A",
        "X",
        "A",
        "M",
        "A",
        "S",
        "A",
        "A",
        "A",
      ],
      [
        "M",
        "A",
        "M",
        "M",
        "M",
        "X",
        "M",
        "M",
        "M",
        "M",
      ],
      [
        "M",
        "X",
        "M",
        "X",
        "A",
        "X",
        "M",
        "A",
        "S",
        "X",
      ],
    ]);
  });

  test("Part 1 • Example", () => {
    const input = parseProgram(txtExample);
    expect(runProgram_part1(input)).toEqual(18);
  });

  test("Part 1", () => {
    const input = parseProgram(txtInput);
    expect(runProgram_part1(input)).toEqual(2344);
  });

  test("Part 2 • Example", () => {
    const input = parseProgram(txtExample);
    expect(runProgram_part2(input)).toEqual(9);
  });

  test("Part 2", () => {
    const input = parseProgram(txtInput);
    expect(runProgram_part2(input)).toEqual(1815);
  });
});
