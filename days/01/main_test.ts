import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { day1_part1, day1_part2, toList } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 1: Historian Hysteria", () => {
  test("toList", () => {
    expect(
      toList(""),
    ).toEqual({
      list1: [],
      list2: [],
    });

    expect(
      toList(txtExample),
    ).toEqual({
      list1: [3, 4, 2, 1, 3, 3],
      list2: [4, 3, 5, 3, 9, 3],
    });
  });

  test("Part 1 • Example", () => {
    expect(day1_part1(txtExample)).toEqual(11);
  });

  test("Part 1", () => {
    expect(day1_part1(txtInput)).toEqual(2430334);
  });

  test("Part 2 • Example", () => {
    expect(day1_part2(txtExample)).toEqual(31);
  });

  test("Part 2", () => {
    expect(day1_part2(txtInput)).toEqual(28786472);
  });
});
