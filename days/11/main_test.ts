import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { blink, parseProgram, runProgram_part1 } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 11: Plutonian Pebbles", () => {
  test("parseProgram", () => {
    expect(parseProgram("0 1 10 99 999")).toEqual([0, 1, 10, 99, 999]);
  });

  test("blink", () => {
    expect(blink([0])).toEqual([1]);
    expect(blink([1])).toEqual([2024]);
    expect(blink([10])).toEqual([1, 0]);
    expect(blink([99])).toEqual([9, 9]);
    expect(blink([999])).toEqual([2021976]);

    expect(blink([0, 1, 10, 99, 999])).toEqual([1, 2024, 1, 0, 9, 9, 2021976]);
  });

  test("blink n times", () => {
    expect(blink([125, 17], 1)).toEqual([253000, 1, 7]);
    expect(blink([125, 17], 2)).toEqual([253, 0, 2024, 14168]);
    expect(blink([125, 17], 3)).toEqual([512072, 1, 20, 24, 28676032]);
    expect(blink([125, 17], 4)).toEqual([
      512,
      72,
      2024,
      2,
      0,
      2,
      4,
      2867,
      6032,
    ]);
    expect(blink([125, 17], 5)).toEqual([
      1036288,
      7,
      2,
      20,
      24,
      4048,
      1,
      4048,
      8096,
      28,
      67,
      60,
      32,
    ]);

    expect(blink([125, 17], 6).length).toEqual(22);
    expect(blink([125, 17], 25).length).toEqual(55312);
  });

  test("Part 1 • Example", () => {
    expect(runProgram_part1(txtExample)).toEqual(55312);
  });

  test("Part 1", () => {
    expect(runProgram_part1(txtInput)).toEqual(224529);
  });
});
