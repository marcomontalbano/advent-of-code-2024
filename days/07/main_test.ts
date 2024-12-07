import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { runProgram_part1 } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

describe("Day 7: Bridge Repair", () => {
  test("Part 1 • Example", () => {
    expect(runProgram_part1(txtExample)).toEqual(3749);
  });
});
