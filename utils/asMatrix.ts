/**
 * Converts a string to a matrix of characters. First dimension is rows, second is columns.
 */
export function asMatrix(str: string): string[][] {
  return str.split("\n").map((line) => line.split(""));
}
