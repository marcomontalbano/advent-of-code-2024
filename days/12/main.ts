// Day 12: Garden Groups
// https://adventofcode.com/2024/day/12

import { asMatrix } from "../../utils/asMatrix.ts";

type MatrixPosition = { col: number; row: number };

type Garden = {
  grid: string[][];
  visited: Set<string>;
};

export function createGarden(input: string): Garden {
  return {
    grid: asMatrix(input),
    visited: new Set(),
  };
}

function toKey(p: MatrixPosition): string {
  return `${p.col},${p.row}`;
}

export function getNeighbors(
  p: MatrixPosition,
): MatrixPosition[] {
  const directions = [
    { col: 0, row: 1 },
    { col: 0, row: -1 },
    { col: 1, row: 0 },
    { col: -1, row: 0 },
  ];

  return directions
    .map((d) => ({ col: p.col + d.col, row: p.row + d.row }));
}

export function findRegion(
  garden: Garden,
  start: MatrixPosition,
  plant: string,
): MatrixPosition[] {
  const region: MatrixPosition[] = [];
  const queue: MatrixPosition[] = [start];

  while (queue.length > 0) {
    const p = queue.shift()!;
    const key = toKey(p);

    if (garden.visited.has(key)) continue;
    if (garden.grid[p.row]?.[p.col] !== plant) continue;

    garden.visited.add(key);
    region.push(p);

    queue.push(...getNeighbors(p));
  }

  return region;
}

export function calculatePerimeter(region: MatrixPosition[]): number {
  let perimeter = 0;
  const regionSet = new Set(region.map(toKey));

  for (const position of region) {
    for (const n of getNeighbors(position)) {
      if (!regionSet.has(toKey(n))) {
        perimeter++;
      }
    }
  }

  return perimeter;
}

function solve(garden: Garden): number {
  let totalPrice = 0;

  for (let row = 0; row < garden.grid.length; row++) {
    for (let col = 0; col < garden.grid[0].length; col++) {
      const point: MatrixPosition = { col, row };
      if (garden.visited.has(toKey(point))) continue;

      const plant = garden.grid[row][col];
      const region = findRegion(garden, point, plant);
      if (region.length === 0) continue;

      const area = region.length;
      const perimeter = calculatePerimeter(region);
      totalPrice += area * perimeter;
    }
  }

  return totalPrice;
}

export function runProgram_part1(input: string): number {
  const garden = createGarden(input);
  return solve(garden);
}
