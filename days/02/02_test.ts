import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { analyzeReport, day2_part1, day2_part2, parseReports } from "./02.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 2", () => {
  test("toReports", () => {
    expect(parseReports(txtExample)).toEqual([
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ]);
  });

  test("analyzeReport", () => {
    const reports = parseReports(txtExample);

    expect(
      analyzeReport(reports[0]),
      "report 1",
    ).toEqual({
      safe: true,
      direction: "decreasing",
    });

    expect(
      analyzeReport(reports[1]),
      "report 2",
    ).toEqual({
      safe: false,
      direction: "increasing",
    });

    expect(
      analyzeReport(reports[2]),
      "report 3",
    ).toEqual({
      safe: false,
      direction: "decreasing",
    });

    expect(
      analyzeReport(reports[3]),
      "report 4",
    ).toEqual({
      safe: false,
      direction: "both",
    });

    expect(
      analyzeReport(reports[4]),
      "report 5",
    ).toEqual({
      safe: false,
      direction: "both",
    });

    expect(
      analyzeReport(reports[5]),
      "report 6",
    ).toEqual({
      safe: true,
      direction: "increasing",
    });
  });

  test("Part 1 • Example", () => {
    expect(day2_part1(txtExample)).toEqual(2);
  });

  test("Part 1", () => {
    expect(day2_part1(txtInput)).toEqual(526);
  });

  test("Part 2 • Example", () => {
    expect(day2_part2(txtExample)).toEqual(4);
  });

  test("Part 2", () => {
    expect(day2_part2(txtInput)).toEqual(566);
  });
});
