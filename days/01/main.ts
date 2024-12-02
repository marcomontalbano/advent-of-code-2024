// Day 1: Historian Hysteria
// https://adventofcode.com/2024/day/1

export function toList(str: string): { list1: number[]; list2: number[] } {
  const list1 = str.match(/^\d+/gm);
  const list2 = str.match(/\d+$/gm);

  return {
    list1: list1?.map(Number) ?? [],
    list2: list2?.map(Number) ?? [],
  };
}

export function day1_part1(str: string): number {
  const { list1, list2 } = toList(str);
  const sortedList1 = list1.toSorted();
  const sortedList2 = list2.toSorted();

  return sortedList1.reduce((distance, value, index) => {
    return distance + Math.abs(value - sortedList2[index]);
  }, 0);
}

export function day1_part2(str: string): number {
  const { list1, list2 } = toList(str);

  return list1.reduce((similarityScore, value) => {
    const times = list2.filter((v) => v === value).length;
    return similarityScore + (value * times);
  }, 0);
}
