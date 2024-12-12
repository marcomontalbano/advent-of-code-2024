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

export function fasterBlink(stones: Record<number, number>) {
  const newStones: Record<number, number> = {};

  for (const [stone, counter] of Object.entries(stones)) {
    if (Number(stone) === 0) {
      newStones[1] = stones[0];
      continue;
    }

    if (stone.length % 2 === 0) {
      const half = stone.length / 2;
      [
        stone.substring(0, half),
        stone.substring(half),
      ]
        .map(Number)
        .forEach(
          (half) => {
            if (newStones[half] == null) {
              newStones[half] = 0;
            }

            newStones[half] += counter;
          },
        );

      continue;
    }

    newStones[Number(stone) * 2024] = counter;
  }

  return newStones;
}

export function fasterCount(
  initialStones: number[],
  times: number,
): number {
  let stones: Record<number, number> = {};

  initialStones.forEach((stone) => {
    stones[stone] ? stones[stone]++ : stones[stone] = 1;
  });

  for (let i = 0; i < times; i++) {
    stones = fasterBlink(stones);
  }

  return Object
    .values(stones)
    .reduce((acc, val) => acc + val, 0);
}

export function runProgram_part1(input: string): number {
  const stones = parseProgram(input);
  return count(stones, 25);
}

export function runProgram_part2(input: string): number {
  const stones = parseProgram(input);
  return fasterCount(stones, 75);
}
