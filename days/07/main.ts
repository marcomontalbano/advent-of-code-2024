// Day 7: Bridge Repair
// https://adventofcode.com/2024/day/7

export function parseProgram(
  str: string,
): Array<{ result: number; numbers: number[] }> {
  return str.split("\n").map((line) => {
    const [result, nums] = line.split(":");
    return {
      result: Number(result),
      numbers: nums.trim().split(" ").map(Number),
    };
  });
}

type Signs = Array<"+" | "*">;

export function matchResult(
  input: ReturnType<typeof parseProgram>[number],
): boolean {
  const { result, numbers } = input;

  function evaluateExpression(numbers: number[], signs: Signs): number {
    return numbers.reduce((acc, num, index) => {
      if (index === 0) return num;
      switch (signs[index - 1]) {
        case "+":
          return acc + num;
        case "*":
          return acc * num;
        default:
          throw new Error("Invalid sign");
      }
    }, 0);
  }

  function generateSignCombinations(length: number): Signs[] {
    const signs: Signs = ["+", "*"];
    const combinations: Signs[] = [];
    const totalCombinations = Math.pow(signs.length, length);

    for (let i = 0; i < totalCombinations; i++) {
      const combination: Signs = [];
      let temp = i;
      for (let j = 0; j < length; j++) {
        const sign = temp % signs.length;
        combination.push(signs[sign]);
        temp = Math.floor(temp / signs.length);
      }
      combinations.push(combination);
    }

    return combinations;
  }

  return generateSignCombinations(numbers.length - 1).some(
    (signCombination) =>
      evaluateExpression(numbers, signCombination) === result,
  );
}

export function runProgram_part1(str: string): number {
  const program = parseProgram(str);

  return program
    .filter(matchResult)
    .reduce((acc, cv) => {
      return acc + cv.result;
    }, 0);
}
