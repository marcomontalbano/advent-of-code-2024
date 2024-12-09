// Day 8: Resonant Collinearity
// https://adventofcode.com/2024/day/8

import { asMatrix } from "../../utils/asMatrix.ts";

export function parseProgram(
  str: string,
): string[][] {
  return asMatrix(str);
}

type Point = { x: number; y: number };

export function findAntennas(matrix: string[][]): Map<string, Point[]> {
  const antennas = new Map<string, Point[]>();

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const char = matrix[y][x];
      if (char !== ".") {
        if (!antennas.has(char)) {
          antennas.set(char, []);
        }
        antennas.get(char)!.push({ x, y });
      }
    }
  }

  return antennas;
}

export function calculateAntinodes(a1: Point, a2: Point): Point[] {
  const dx = a2.x - a1.x;
  const dy = a2.y - a1.y;

  const antinode1 = {
    x: a1.x - dx,
    y: a1.y - dy,
  };

  const antinode2 = {
    x: a2.x + dx,
    y: a2.y + dy,
  };

  return [antinode1, antinode2];
}

export function runProgram_part1(str: string): number {
  const program = parseProgram(str);
  const antennas = findAntennas(program);
  const antinodes = new Set<string>();

  for (const points of antennas.values()) {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const newAntinodes = calculateAntinodes(points[i], points[j]);
        for (const node of newAntinodes) {
          if (
            node.x >= 0 && node.x < program[0].length &&
            node.y >= 0 && node.y < program.length
          ) {
            antinodes.add(`${node.x},${node.y}`);
          }
        }
      }
    }
  }

  return antinodes.size;
}

// https://www.cuemath.com/geometry/collinear-points/
export function areCollinear(p1: Point, p2: Point, p3: Point): boolean {
  return p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y) ===
    0;
}

export function runProgram_part2(str: string): number {
  const program = parseProgram(str);
  const antennas = findAntennas(program);
  const antinodes = new Set<string>();

  for (const points of antennas.values()) {
    for (let y = 0; y < program.length; y++) {
      for (let x = 0; x < program[0].length; x++) {
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            if (areCollinear({ x, y }, points[i], points[j])) {
              antinodes.add(`${x},${y}`);
              break;
            }
          }
        }
      }
    }
  }

  return antinodes.size;
}
