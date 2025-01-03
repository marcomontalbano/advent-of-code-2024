import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import {
  calculatePerimeter,
  createGarden,
  findRegion,
  getNeighbors,
  runProgram_part1,
} from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

const txtSimpleExample = `AAAA
BBCD
BBCC
EEEC`;

describe("Day 12: Garden Groups", () => {
  it("createGarden", () => {
    expect(createGarden(txtSimpleExample)).toEqual({
      grid: [
        ["A", "A", "A", "A"],
        ["B", "B", "C", "D"],
        ["B", "B", "C", "C"],
        ["E", "E", "E", "C"],
      ],
      visited: new Set(),
    });
  });

  it("getNeighbors", () => {
    expect(
      getNeighbors({ row: 0, col: 0 }),
    ).toEqual([
      { row: 1, col: 0 },
      { row: -1, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: -1 },
    ]);

    expect(
      getNeighbors({ row: 1, col: 1 }),
    ).toEqual([
      { row: 2, col: 1 },
      { row: 0, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 0 },
    ]);
  });

  it("findRegion", () => {
    const garden = createGarden(txtSimpleExample);
    expect(
      findRegion(garden, { row: 0, col: 0 }, "A"),
    ).toEqual([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
    ]);

    expect(
      findRegion(garden, { row: 0, col: 0 }, "B"),
    ).toEqual([]);

    expect(
      findRegion(garden, { row: 1, col: 0 }, "B"),
    ).toEqual([
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ]);
  });

  it("calculatePerimeter", () => {
    const garden = createGarden(txtSimpleExample);
    const region = findRegion(garden, { row: 0, col: 0 }, "A");

    expect(calculatePerimeter(region)).toEqual(10);

    expect(
      findRegion(garden, { row: 0, col: 0 }, "B"),
    ).toEqual([]);

    expect(
      findRegion(garden, { row: 1, col: 0 }, "B"),
    ).toEqual([
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ]);
  });

  it("Part 1 • Example #1", () => {
    expect(runProgram_part1(
      `AAAA
BBCD
BBCC
EEEC`,
    )).toEqual(140);
  });

  it("Part 1 • Example #2", () => {
    expect(runProgram_part1(
      `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
    )).toEqual(772);
  });

  it("Part 1 • Example #3", () => {
    expect(runProgram_part1(txtExample)).toEqual(1930);
  });

  it("Part 1", () => {
    expect(runProgram_part1(txtInput)).toEqual(1533024);
  });
});
