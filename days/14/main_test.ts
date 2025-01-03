import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import {
  moveRobot,
  moveRobotForSeconds,
  moveRobotsForSeconds,
  parseInput,
  runProgram_part1,
} from "./main.ts";

const txtExample = Deno.readTextFileSync(
  new URL("example.txt", import.meta.url),
);
const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

describe("Day 14: Restroom Redoubt", () => {
  it("Parse input", () => {
    expect(parseInput(txtExample)).toEqual([
      { position: { x: 0, y: 4 }, velocity: { x: 3, y: -3 } },
      { position: { x: 6, y: 3 }, velocity: { x: -1, y: -3 } },
      { position: { x: 10, y: 3 }, velocity: { x: -1, y: 2 } },
      { position: { x: 2, y: 0 }, velocity: { x: 2, y: -1 } },
      { position: { x: 0, y: 0 }, velocity: { x: 1, y: 3 } },
      { position: { x: 3, y: 0 }, velocity: { x: -2, y: -2 } },
      { position: { x: 7, y: 6 }, velocity: { x: -1, y: -3 } },
      { position: { x: 3, y: 0 }, velocity: { x: -1, y: -2 } },
      { position: { x: 9, y: 3 }, velocity: { x: 2, y: 3 } },
      { position: { x: 7, y: 3 }, velocity: { x: -1, y: 2 } },
      { position: { x: 2, y: 4 }, velocity: { x: 2, y: -3 } },
      { position: { x: 9, y: 5 }, velocity: { x: -3, y: -3 } },
    ]);
  });

  it("moveRobot", () => {
    expect(
      moveRobot(
        {
          position: { x: 2, y: 4 },
          velocity: { x: 2, y: -3 },
        },
        { width: 11, height: 7 },
      ),
    ).toEqual(
      {
        position: { x: 4, y: 1 },
        velocity: { x: 2, y: -3 },
      },
    );

    expect(
      moveRobot(
        {
          position: { x: 4, y: 1 },
          velocity: { x: 2, y: -3 },
        },
        { width: 11, height: 7 },
      ),
    ).toEqual(
      {
        position: { x: 6, y: 5 },
        velocity: { x: 2, y: -3 },
      },
    );

    expect(
      moveRobot(
        {
          position: { x: 6, y: 5 },
          velocity: { x: 2, y: -3 },
        },
        { width: 11, height: 7 },
      ),
    ).toEqual(
      {
        position: { x: 8, y: 2 },
        velocity: { x: 2, y: -3 },
      },
    );

    expect(
      moveRobot(
        {
          position: { x: 8, y: 2 },
          velocity: { x: 2, y: -3 },
        },
        { width: 11, height: 7 },
      ),
    ).toEqual(
      {
        position: { x: 10, y: 6 },
        velocity: { x: 2, y: -3 },
      },
    );

    expect(
      moveRobot(
        {
          position: { x: 10, y: 6 },
          velocity: { x: 2, y: -3 },
        },
        { width: 11, height: 7 },
      ),
    ).toEqual(
      {
        position: { x: 1, y: 3 },
        velocity: { x: 2, y: -3 },
      },
    );
  });

  it("moveRobotForSeconds", () => {
    expect(
      moveRobotForSeconds(
        {
          position: { x: 2, y: 4 },
          velocity: { x: 2, y: -3 },
        },
        { width: 11, height: 7 },
        5,
      ),
    ).toEqual(
      {
        position: { x: 1, y: 3 },
        velocity: { x: 2, y: -3 },
      },
    );
  });

  it("moveRobotsForSeconds", () => {
    const robots = parseInput(txtExample);
    expect(moveRobotsForSeconds(robots, { width: 11, height: 7 }, 100)).toEqual(
      [
        { position: { x: 3, y: 5 }, velocity: { x: 3, y: -3 } },
        { position: { x: 5, y: 4 }, velocity: { x: -1, y: -3 } },
        { position: { x: 9, y: 0 }, velocity: { x: -1, y: 2 } },
        { position: { x: 4, y: 5 }, velocity: { x: 2, y: -1 } },
        { position: { x: 1, y: 6 }, velocity: { x: 1, y: 3 } },
        { position: { x: 1, y: 3 }, velocity: { x: -2, y: -2 } },
        { position: { x: 6, y: 0 }, velocity: { x: -1, y: -3 } },
        { position: { x: 2, y: 3 }, velocity: { x: -1, y: -2 } },
        { position: { x: 0, y: 2 }, velocity: { x: 2, y: 3 } },
        { position: { x: 6, y: 0 }, velocity: { x: -1, y: 2 } },
        { position: { x: 4, y: 5 }, velocity: { x: 2, y: -3 } },
        { position: { x: 6, y: 6 }, velocity: { x: -3, y: -3 } },
      ],
    );
  });

  it("Part 1 - Example", () => {
    const robots = parseInput(txtExample);
    expect(
      runProgram_part1(
        robots,
        { width: 11, height: 7 },
        100,
      ),
    )
      .toBe(12);
  });

  it("Part 1", () => {
    const robots = parseInput(txtInput);
    expect(
      runProgram_part1(
        robots,
        { width: 101, height: 103 },
        100,
      ),
    )
      .toBe(222901875);
  });
});
