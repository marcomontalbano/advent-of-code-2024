// Day 11: Plutonian Pebbles
// https://adventofcode.com/2024/day/11

export function parseProgram(str: string): number[] {
  return str.split(" ").map(Number);
}

export function blink(stones: number[], times: number = 1): number[] {
  if (times > 1) {
    return blink(blink(stones), times - 1);
  }

  return stones.reduce<number[]>((acc, stone) => {
    if (stone === 0) {
      acc.push(1);
      return acc;
    }

    if (stone.toString(10).length % 2 === 0) {
      acc.push(
        Number(stone.toString(10).slice(0, stone.toString(10).length / 2)),
      );
      acc.push(Number(stone.toString(10).slice(stone.toString(10).length / 2)));
      return acc;
    }

    acc.push(stone * 2024);
    return acc;
  }, []);
}

export function runProgram_part1(input: string): number {
  const stones = parseProgram(input);
  const result = blink(stones, 25);
  return result.length;
}
