// Day 3: Mull It Over
// https://adventofcode.com/2024/day/3

export function parseProgram(str: string): [number, number][] {
  const regexp = /mul\(\d{1,3}\,\d{1,3}\)/gm;
  return str.match(regexp)?.map((mul) => {
    const [a, b] = mul.match(/\d{1,3}/g)!.map(Number);
    return [a, b];
  }) ?? [];
}

export function day03_part1(str: string): number {
  const program = parseProgram(str);
  return program.reduce((acc, [a, b]) => acc + a * b, 0);
}
