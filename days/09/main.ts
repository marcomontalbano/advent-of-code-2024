// Day 9: Disk Fragmenter
// https://adventofcode.com/2024/day/9

export function parseInput(str: string): number[] {
  return str.split("").map(Number);
}

export function toDenseFormat(diskMap: number[]): string {
  let result = "";
  let fileId = 0;

  diskMap.forEach((length, i) => {
    if (i % 2 === 0) {
      result += String(fileId).repeat(length);
      fileId++;
    } else {
      result += ".".repeat(length);
    }
  });

  return result;
}
