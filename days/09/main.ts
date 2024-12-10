// Day 9: Disk Fragmenter
// https://adventofcode.com/2024/day/9

type DiskMap = number[];
type Disk = (string | number)[];

export function parseInput(str: string): number[] {
  return str.split("").map(Number);
}

export function newArray<T extends unknown>(
  length: number | undefined,
  fill: T,
): T[] {
  if (length === undefined) {
    return [];
  }

  return new Array(length).fill(fill);
}

export function toDenseFormat(diskMap: DiskMap): Disk {
  const result: Disk = [];

  for (let fileId = 0; fileId < diskMap.length / 2; fileId++) {
    const size = diskMap[fileId * 2];
    const space = diskMap[fileId * 2 + 1];
    result.push(...newArray(size, fileId));
    result.push(...newArray(space, "."));
  }

  return result;
}

export function compact_part1(disk: Disk): Disk {
  for (let rightmostPos = disk.length - 1; rightmostPos > 0; rightmostPos--) {
    if (disk[rightmostPos] === ".") {
      continue;
    }

    const leftmostPos = disk.indexOf(".");
    if (leftmostPos < rightmostPos) {
      disk[leftmostPos] = disk[rightmostPos];
      disk[rightmostPos] = ".";
    }
  }

  return disk;
}

export function compact_part2(disk: Disk): Disk {
  for (let rightmostPos = disk.length - 1; rightmostPos > 0; rightmostPos--) {
    if (disk[rightmostPos] === ".") {
      continue;
    }

    const currentNumber = disk[rightmostPos];
    const currentNumberFirstOccurrence = disk.indexOf(currentNumber);
    const length = disk.filter((val) => val === currentNumber).length;
    const leftmostPos = disk.map((x) => x === "." ? x : "n").join("").indexOf(
      ".".repeat(length),
    );

    if (leftmostPos < rightmostPos && leftmostPos !== -1) {
      disk.splice(
        leftmostPos,
        length,
        ...newArray(length, currentNumber),
      );
      disk.splice(
        currentNumberFirstOccurrence,
        length,
        ...newArray(length, "."),
      );
    }
  }

  return disk;
}

function calculateChecksumFromDiskArray(disk: Disk): number {
  return disk.reduce((checksum: number, block, position) => {
    if (block === ".") {
      return checksum;
    }

    return checksum + (typeof block === "number" ? block * position : 0);
  }, 0);
}

export function runProgram_part1(str: string): number {
  const numbers = parseInput(str);
  const initialMap = toDenseFormat(numbers);
  const compacted = compact_part1(initialMap);
  return calculateChecksumFromDiskArray(compacted);
}

export function runProgram_part2(str: string): number {
  const numbers = parseInput(str);
  const initialMap = toDenseFormat(numbers);
  const compacted = compact_part2(initialMap);
  return calculateChecksumFromDiskArray(compacted);
}
