import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import {
  blink,
  blinkStone,
  count,
  fasterBlink,
  fasterCount,
  parseProgram,
  runProgram_part1,
  runProgram_part2,
} from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 11: Plutonian Pebbles", () => {
  it("parseProgram", () => {
    expect(parseProgram("0 1 10 99 999")).toEqual([0, 1, 10, 99, 999]);
  });

  it("blinkStone", () => {
    expect(blinkStone(0)).toEqual([1]);
    expect(blinkStone(1)).toEqual([2024]);
    expect(blinkStone(10)).toEqual([1, 0]);
    expect(blinkStone(99)).toEqual([9, 9]);
    expect(blinkStone(999)).toEqual([2021976]);
  });

  it("blink n times", () => {
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

  it("count", () => {
    expect(count([0], 1)).toEqual(1);
    expect(count([125, 17], 1)).toEqual(3);
    expect(count([125, 17], 2)).toEqual(4);
    expect(count([125, 17], 3)).toEqual(5);
    expect(count([125, 17], 4)).toEqual(9);
    expect(count([125, 17], 5)).toEqual(13);
    expect(count([125, 17], 6)).toEqual(22);
    expect(count([125, 17], 25)).toEqual(55312);
  });

  it("fasterBlink", () => {
    expect(fasterBlink({ 0: 1 })).toEqual({ 1: 1 });
    expect(fasterBlink({ 1: 1 })).toEqual({ 2024: 1 });
    expect(fasterBlink({ 2: 2 })).toEqual({ 4048: 2 });
    expect(fasterBlink({ 1: 1, 2: 1 })).toEqual({ 2024: 1, 4048: 1 });
    expect(fasterBlink({ 17: 1 })).toEqual({ 1: 1, 7: 1 });
    expect(fasterBlink({ 1: 1, 20242024: 1 })).toEqual({ 2024: 3 });
  });

  it("fasterBlink n times", () => {
    expect(fasterBlink({ 125: 1, 17: 1 })).toEqual({ 1: 1, 253000: 1, 7: 1 });
    expect(fasterBlink({ 1: 1, 253000: 1, 7: 1 })).toEqual({
      0: 1,
      14168: 1,
      2024: 1,
      253: 1,
    });
    expect(fasterBlink({
      0: 1,
      14168: 1,
      2024: 1,
      253: 1,
    })).toEqual({
      1: 1,
      20: 1,
      24: 1,
      28676032: 1,
      512072: 1,
    });
    expect(fasterBlink({
      1: 1,
      20: 1,
      24: 1,
      28676032: 1,
      512072: 1,
    })).toEqual({
      0: 1,
      2: 2,
      2024: 1,
      2867: 1,
      4: 1,
      512: 1,
      6032: 1,
      72: 1,
    });
  });

  it("fasterCount", () => {
    expect(fasterCount([0], 1)).toEqual(1);
    expect(fasterCount([125, 17], 1)).toEqual(3);
    expect(fasterCount([125, 17], 2)).toEqual(4);
    expect(fasterCount([125, 17], 3)).toEqual(5);
    expect(fasterCount([125, 17], 4)).toEqual(9);
    expect(fasterCount([125, 17], 5)).toEqual(13);
    expect(fasterCount([125, 17], 6)).toEqual(22);
    expect(fasterCount([125, 17], 25)).toEqual(55312);
  });

  it("Part 1 • Example", () => {
    expect(runProgram_part1(txtExample)).toEqual(55312);
  });

  it("Part 1", () => {
    expect(runProgram_part1(txtInput)).toEqual(224529);
  });

  it("Part 2", () => {
    expect(runProgram_part2(txtInput)).toEqual(266820198587914);
  });
});
