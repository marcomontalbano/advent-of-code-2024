// Day 10: Hoof It
// https://adventofcode.com/2024/day/10

import { asMatrix } from "../../utils/asMatrix.ts";

type MatrixPosition = { col: number; row: number };

export function hike(
  matrix: number[][],
  position: MatrixPosition,
  currentNumber: number = 1,
): MatrixPosition[] {
  if (currentNumber > 9) {
    return [position];
  }

  return [
    { col: position.col, row: position.row - 1 },
    { col: position.col, row: position.row + 1 },
    { col: position.col - 1, row: position.row },
    { col: position.col + 1, row: position.row },
  ]
    .filter(({ col, row }) => matrix[row]?.[col] === currentNumber)
    .map(({ col, row }) => hike(matrix, { col, row }, currentNumber + 1))
    .flat();
}

export function findZeros(matrix: number[][]): MatrixPosition[] {
  const zeros: MatrixPosition[] = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) {
        zeros.push({ col, row });
      }
    }
  }

  return zeros;
}

function countUnique(positions: MatrixPosition[]): number {
  return Array.from(
    new Set(positions.map(({ row, col }) => `${row},${col}`)),
  ).length;
}

export function runProgram_part1(input: string): number {
  const matrix = asMatrix(input, Number);
  const zeros = findZeros(matrix);
  return zeros
    .map((zero) => countUnique(hike(matrix, zero)))
    .reduce((total, value) => total + value, 0);
}
