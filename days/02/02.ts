// Day 2: Red-Nosed Reports
// https://adventofcode.com/2024/day/2

export function parseReports(str: string): number[][] {
  return str
    .split("\n")
    .map(
      (report) =>
        report
          .split(" ")
          .map(Number),
    );
}

export function analyzeReport(report: number[]) {
  return report.reduce<{
    safe: boolean;
    direction: "increasing" | "decreasing" | "both";
  }>((acc, currentValue, index, arr) => {
    const previousValue = arr[index - 1];

    if (acc.safe === false) {
      return acc;
    }

    if (index === 0) {
      return acc;
    }

    if (
      (acc.direction === "increasing" && currentValue <= previousValue) ||
      (acc.direction === "decreasing" && currentValue >= previousValue)
    ) {
      return {
        safe: false,
        direction: "both",
      };
    }

    if (acc.direction === "increasing" && currentValue - previousValue > 3) {
      return {
        safe: false,
        direction: "increasing",
      };
    }

    if (acc.direction === "decreasing" && previousValue - currentValue > 3) {
      return {
        safe: false,
        direction: "decreasing",
      };
    }

    return acc;
  }, {
    safe: true,
    direction: report[0] < report[1] ? "increasing" : "decreasing",
  });
}

function isReportSafe(report: number[]): boolean {
  return analyzeReport(report).safe;
}

export function day2_part1(str: string): number {
  const reports = parseReports(str);
  return reports
    .filter(isReportSafe)
    .length;
}

export function day2_part2(str: string): number {
  const reports = parseReports(str);
  return reports
    .filter((report) => {
      const dampenedReportVariations = report
        .map((_, i) => report.toSpliced(i, 1));

      return isReportSafe(report) ||
        dampenedReportVariations.some(isReportSafe);
    })
    .length;
}
