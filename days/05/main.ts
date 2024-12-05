// Day 5: Print Queue
// https://adventofcode.com/2024/day/5

type ProgramInput = { pageOrderRules: string[]; pagesToProduce: string[] };

export function parseProgram(
  str: string,
): ProgramInput {
  const splitted = str.split("\n\n");
  const pageOrderRules = splitted[0].split("\n");
  const pagesToProduce = splitted[1].split("\n");

  return { pageOrderRules, pagesToProduce };
}

export function check(pageOrderRule: string, pagesToProduce: string): boolean {
  const [page1, page2] = pageOrderRule.split("|");
  const pages = pagesToProduce.split(",");

  const page1index = pages.indexOf(page1);
  const page2index = pages.indexOf(page2);

  return page1index !== -1 && page2index !== -1 && page1index < page2index;
}

export function filterValidPageOrderRules(
  pageOrderRules: string[],
  pageToProduce: string,
): string[] {
  const validPageOrderRules = pageOrderRules.filter((pageOrderRules) => {
    const [page1, page2] = pageOrderRules.split("|");
    return pageToProduce.split(",").includes(page1) &&
      pageToProduce.split(",").includes(page2);
  });

  return validPageOrderRules;
}

export function runProgram_part1(input: ProgramInput): number {
  const validPagesToProduct = input.pagesToProduce.filter((pageToProduce) => {
    const validPageOrderRules = filterValidPageOrderRules(
      input.pageOrderRules,
      pageToProduce,
    );

    return validPageOrderRules.every((pageOrderRule) =>
      check(pageOrderRule, pageToProduce)
    );
  });

  return validPagesToProduct.reduce<number>((sum, pageToProduce) => {
    const pages = pageToProduce.split(",");
    return sum + parseInt(pages[Math.floor(pages.length / 2)]);
  }, 0);
}
