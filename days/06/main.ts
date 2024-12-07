// Day 6: Guard Gallivant
// https://adventofcode.com/2024/day/6

import { asMatrix } from "../../utils/asMatrix.ts";

type Cord<name extends string> = {
  [K in `row${name}` | `col${name}`]: number;
};

export function findGuard(str: string): Cord<"Index"> {
  const guard = "^";

  const guardMap = asMatrix(str);

  return guardMap.reduce<Cord<"Index">>((acc, row, rowIndex) => {
    const colIndex = row.indexOf(guard);
    return colIndex !== -1 ? { rowIndex, colIndex } as const : acc;
  }, { rowIndex: -1, colIndex: -1 });
}

function getDirection(guardAvatar: string): Cord<"Direction"> {
  if (guardAvatar === "^") return { rowDirection: -1, colDirection: 0 };
  if (guardAvatar === ">") return { rowDirection: 0, colDirection: 1 };
  if (guardAvatar === "v") return { rowDirection: 1, colDirection: 0 };
  if (guardAvatar === "<") return { rowDirection: 0, colDirection: -1 };
  throw new Error("Invalid guard avatar");
}

function turnRight(direction: string): string {
  if (direction === "^") return ">";
  if (direction === ">") return "v";
  if (direction === "v") return "<";
  if (direction === "<") return "^";
  throw new Error("Invalid direction");
}

export function runSimulation(str: string) {
  const guardMap = asMatrix(str);
  let continuing = true;
  let { rowIndex, colIndex } = findGuard(str);
  let direction = guardMap[rowIndex][colIndex];
  let { rowDirection, colDirection } = getDirection(
    guardMap[rowIndex][colIndex],
  );

  const store = {
    path: new Map([[`${rowIndex},${colIndex}`, 1]]),
    infinite: false,
  };

  while (
    continuing &&
    rowIndex + rowDirection !== -1 &&
    colIndex + colDirection !== -1 &&
    rowIndex + rowDirection < guardMap.length &&
    colIndex + colDirection < guardMap[rowIndex + rowDirection].length
  ) {
    if (guardMap[rowIndex + rowDirection][colIndex + colDirection] === "#") {
      direction = turnRight(direction);
      ({ rowDirection, colDirection } = getDirection(direction));
    } else {
      rowIndex += rowDirection;
      colIndex += colDirection;
    }

    const counter = (store.path.get(`${rowIndex},${colIndex}`) || 0) + 1;

    store.path.set(`${rowIndex},${colIndex}`, counter);

    if (counter > 1_000) {
      store.infinite = true;
      continuing = false;
    }
  }

  return store;
}

export function runProgram_part1(str: string): number {
  return runSimulation(str).path.size;
}

export function runProgram_part2(str: string): number {
  const guardMap = asMatrix(str);
  const { rowIndex: startRow, colIndex: startCol } = findGuard(str);
  let validObstructions = 0;

  for (let row = 0; row < guardMap.length; row++) {
    for (let col = 0; col < guardMap[row].length; col++) {
      if (
        guardMap[row][col] === "#" || (row === startRow && col === startCol)
      ) {
        continue;
      }

      const newMap = asMatrix(str);
      newMap[row][col] = "#";

      const result = runSimulation(
        newMap.map((row) => row.join("")).join("\n"),
      );

      if (result.infinite) {
        validObstructions++;
      }
    }
  }

  return validObstructions;
}
