import { expect } from "@std/expect";
import { describe, test } from "@std/testing/bdd";
import { parseInput, toDenseFormat } from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
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

  test("toDenseFormat", () => {
    const diskMap = parseInput(txtExample);
    expect(toDenseFormat(diskMap)).toEqual(
      "00...111...2...333.44.5555.6666.777.888899",
    );
  });
});
