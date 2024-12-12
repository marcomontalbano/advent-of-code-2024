// Day 11: Plutonian Pebbles
// https://adventofcode.com/2024/day/11

export function parseProgram(str: string): number[] {
  return str.split(" ").map(Number);
}

export function blinkStone(stone: number): number[] {
  if (stone === 0) {
    return [1];
  }

  const stoneAsString = stone.toString(10);
  if (stoneAsString.length % 2 === 0) {
    return [
      Number(stoneAsString.slice(0, stoneAsString.length / 2)),
      Number(stoneAsString.slice(stoneAsString.length / 2)),
    ];
  }

  return [stone * 2024];
}

export function blink(stones: number[], times: number): number[] {
  if (times > 1) {
    return blink(blink(stones, 1), times - 1);
  }

  return stones.reduce<number[]>((acc, stone) => {
    acc.push(...blinkStone(stone));
    return acc;
  }, []);
}

export function count(
  stones: number[],
  times: number,
  memo: number = 0,
): number {
  if (times <= 0) {
    return stones.length;
  }

  return stones.reduce((acc, stone) => {
    return acc + count(blinkStone(stone), times - 1, memo);
  }, memo);
}

export function runProgram_part1(input: string): number {
  const stones = parseProgram(input);
  return count(stones, 25);
}
