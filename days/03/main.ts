// Day 3: Mull It Over
// https://adventofcode.com/2024/day/3

export function parseProgram_part1(str: string): [number, number][] {
  const regexp = /mul\(\d{1,3}\,\d{1,3}\)/gm;
  return str.match(regexp)?.map((mul) => {
    const [a, b] = mul.match(/\d{1,3}/g)!.map(Number);
    return [a, b];
  }) ?? [];
}

export function parseProgram_part2(str: string): [number, number][] {
  const regexp = /do\(\)|don't\(\)|mul\(\d{1,3}\,\d{1,3}\)/gm;
  return str.match(regexp)?.reduce<
    { result: [number, number][]; lastInstruction: "do" | "don't" }
  >((acc, mul) => {
    if (mul === "do()") {
      acc.lastInstruction = "do";
    } else if (mul === "don't()") {
      acc.lastInstruction = "don't";
    } else {
      const [a, b] = mul.match(/\d{1,3}/g)!.map(Number);
      if (acc.lastInstruction === "do") {
        acc.result.push([a, b]);
      }
    }

    return acc;
  }, { result: [], lastInstruction: "do" }).result ?? [];
}

export function runProgram(input: [number, number][]): number {
  return input.reduce((acc, [a, b]) => acc + a * b, 0);
}
