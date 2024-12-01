import { assertEquals } from "@std/assert";
import { day1_part1, day1_part2, toList } from "../01/01.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

Deno.test("toList", () => {
  assertEquals(
    toList(txtExample),
    {
      list1: [3, 4, 2, 1, 3, 3],
      list2: [4, 3, 5, 3, 9, 3],
    },
  );
});

Deno.test("Day 1 • Part 1 • Example", () => {
  assertEquals(day1_part1(txtExample), 11);
});

Deno.test("Day 1 • Part 1", () => {
  assertEquals(day1_part1(txtInput), 2430334);
});

Deno.test("Day 1 • Part 2 • Example", () => {
  assertEquals(day1_part2(txtExample), 31);
});

Deno.test("Day 1 • Part 2", () => {
  assertEquals(day1_part2(txtInput), 28786472);
});
