// Day 4: Ceres Search
// https://adventofcode.com/2024/day/4

import { asMatrix } from "../../utils/asMatrix.ts";

export function parseProgram(str: string): string[][] {
  return asMatrix(str);
}

function findWord(
  input: string[][],
  word: string,
  x: number,
  y: number,
  dirX: -1 | 0 | 1,
  dirY: -1 | 0 | 1,
): 0 | 1 {
  for (let i = 1; i < word.length; i++) {
    const newX = x + i * dirX;
    const newY = y + i * dirY;

    if (
      x >= input.length ||
      y >= input.length ||
      newX < 0 ||
      newY < 0 ||
      newX >= input.length ||
      newY >= input[x].length
    ) {
      return 0;
    }

    if (input[x][y] !== word[0]) {
      return 0;
    }

    if (input[newX][newY] !== word[i]) {
      return 0;
    }
  }

  return 1;
}

export function runProgram_part1(input: string[][]): number {
  let counter = 0;
  const word = "XMAS";

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      const result = 0 +
        findWord(input, word, x, y, -1, -1) +
        findWord(input, word, x, y, 0, -1) +
        findWord(input, word, x, y, 1, -1) +
        findWord(input, word, x, y, -1, 0) +
        findWord(input, word, x, y, 1, 0) +
        findWord(input, word, x, y, -1, 1) +
        findWord(input, word, x, y, 0, 1) +
        findWord(input, word, x, y, 1, 1);

      counter += result;
    }
  }

  return counter;
}

export function runProgram_part2(input: string[][]): number {
  let counter = 0;
  const word = "MAS";

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      const result = 0 +
        findWord(input, word, x, y, 1, 1) +
        findWord(input, word, x + 2, y, -1, 1) +
        findWord(input, word, x, y + 2, 1, -1) +
        findWord(input, word, x + 2, y + 2, -1, -1);

      if (result >= 2) {
        counter += 1;
      }
    }
  }

  return counter;
}
