import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import {
  check,
  filterValidPageOrderRules,
  getPageOrderMap,
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

describe("Day 5: Print Queue", () => {
  test("Part 1 • parseProgram", () => {
    expect(parseProgram(txtExample)).toEqual({
      pageOrderRules: [
        "47|53",
        "97|13",
        "97|61",
        "97|47",
        "75|29",
        "61|13",
        "75|53",
        "29|13",
        "97|29",
        "53|29",
        "61|53",
        "97|53",
        "61|29",
        "47|13",
        "75|47",
        "97|75",
        "47|61",
        "75|61",
        "47|29",
        "75|13",
        "53|13",
      ],
      pagesToProduce: [
        "75,47,61,53,29",
        "97,61,53,29,13",
        "75,29,13",
        "75,97,47,61,53",
        "61,13,29",
        "97,13,75,29,47",
      ],
    });
  });

  test("Part 1 • check", () => {
    expect(check("47|53", "75,47,61,53,29")).toEqual(true);
    expect(check("47|53", "97,61,53,29,13")).toEqual(false);
    expect(check("97|75", "75,97,47,61,53")).toEqual(false);
  });

  test("Part 1 • filterValidPageOrderRules", () => {
    expect(
      filterValidPageOrderRules(
        ["47|53", "61|53", "53|13", "75|47", "97|53"],
        "75,47,61,53,29",
      ),
    ).toEqual([
      "47|53",
      "61|53",
      "75|47",
    ]);
  });

  test("Part 1 • Example", () => {
    const input = parseProgram(txtExample);
    expect(runProgram_part1(input)).toEqual(143);
  });

  test("Part 1", () => {
    const input = parseProgram(txtInput);
    expect(runProgram_part1(input)).toEqual(4790);
  });

  test("Part 2 • Example", () => {
    const input = parseProgram(txtExample);
    expect(getPageOrderMap(input.pageOrderRules)).toEqual(
      new Map([
        [
          "47",
          new Set([
            "53",
            "13",
            "61",
            "29",
          ]),
        ],
        [
          "97",
          new Set([
            "13",
            "61",
            "47",
            "29",
            "53",
            "75",
          ]),
        ],
        [
          "75",
          new Set([
            "29",
            "53",
            "47",
            "61",
            "13",
          ]),
        ],
        [
          "61",
          new Set([
            "13",
            "53",
            "29",
          ]),
        ],
        [
          "29",
          new Set([
            "13",
          ]),
        ],
        [
          "53",
          new Set([
            "29",
            "13",
          ]),
        ],
      ]),
    );
  });

  test("Part 2 • Example", () => {
    const input = parseProgram(txtExample);
    expect(runProgram_part2(input)).toEqual(123);
  });

  test("Part 2", () => {
    const input = parseProgram(txtInput);
    expect(runProgram_part2(input)).toEqual(6319);
  });
});
